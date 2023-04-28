import { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Signature from 'react-native-signature-canvas';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';

const Assinatura = ({ route }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signedFile, setSignedFile] = useState('nenhum arquivo assinado');
  const signatureRef = useRef();
  const { file } = route.params;

  console.log('Assinando ', file);

  const fetchPDF = async () => {
    try {
      console.log('-----------> File: ', file);
      const pdfBytes = await RNFS.readFile(file, 'base64');
      console.log('-----------> bytes ', pdfBytes);
      return pdfBytes;
    } catch (err) {
      console.error('Ocorreu um erro:', err);
    }
  };

  const addSignatureToPDF = async signatureBase64 => {
    const pdfBytes = await fetchPDF();
    const pdfDoc = await PDFDocument.load(
      'data:application/pdf;base64,' + pdfBytes,
    );

    const page = pdfDoc.getPages()[0];
    const signatureImage = await pdfDoc.embedPng(signatureBase64);

    const signatureWidth = 200;
    const signatureHeight = 100;
    const signatureX = 50;
    const signatureY = 50;

    page.drawImage(signatureImage, {
      x: signatureX,
      y: signatureY,
      width: signatureWidth,
      height: signatureHeight,
    });

    const modifiedPDFBase64 = await pdfDoc.saveAsBase64();
    console.log('Assinatura adicionada: ', modifiedPDFBase64);
    await saveSignedPDF(modifiedPDFBase64);
  };

  const handleSaveSignature = async signatureBase64 => {
    try {
      setIsSigning(true);
      await addSignatureToPDF(signatureBase64);
      setIsSigned(true);
      setIsSigning(false);
    } catch (error) {
      console.error('Erro ao salvar assinatura: ', error);
    }
  };

  const saveSignedPDF = async signedPDFBase64 => {
    console.log('-----------> salvando **************');
    let timestamp = new Date().toISOString().replace(/\D/g, '');
    const newFileName = `signed_pdf_${timestamp}.pdf`;
    const newFilePath = file.replace('inspection_results.pdf', newFileName);
    console.log('-----------> salvando em ', newFilePath);
    await RNFS.writeFile(newFilePath, signedPDFBase64, 'base64');
    setSignedFile(newFilePath);
    console.log('Arquivo PDF assinado salvo em:', newFilePath);
  };

  return (
    <View style={styles.container}>
      {!isSigned ? (
        <View style={styles.signatureContainer}>
          <Signature
            ref={signatureRef}
            onOK={handleSaveSignature}
            onEmpty={() => setIsSigned(false)}
            webStyle={styles.signature}
          />
        </View>
      ) : isSigning ? (
        <ActivityIndicator size="large" />
      ) : (
        <Pdf source={{ uri: 'file:///' + signedFile }} style={styles.pdf} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signatureContainer: {
    flex: 1,
  },
  signature: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pdf: {
    flex: 1,
  },
});

export default Assinatura;
