import DocumentPicker from 'react-native-document-picker';
import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Signature from 'react-native-signature-canvas';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';

const Assinatura = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [signedPDF, setSignedPDF] = useState(null);
  const signatureRef = useRef();

  const fetchPDF = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      let file = result[0];
      console.log('-----------> result ', file);
      const pdfPath = file.uri;
      console.log('-----------> path ', pdfPath);
      const pdfBytes = await RNFS.readFile(pdfPath, 'base64');
      console.log('-----------> bytes ', pdfBytes);
      return pdfBytes;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Operação cancelada pelo usuário');
      } else {
        console.error('Ocorreu um erro ao escolher o arquivo PDF:', err);
      }
    }
  };

  const addSignatureToPDF = async signatureBase64 => {
    const pdfBytes = await fetchPDF();
    const pdfDoc = await PDFDocument.load(Buffer.from(pdfBytes, 'base64'));

    const page = pdfDoc.getPages()[0];
    const signatureImage = await pdfDoc.embedPng(
      Buffer.from(signatureBase64, 'base64'),
    );

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

    const modifiedPDFBytes = await pdfDoc.save();
    const modifiedPDFBase64 = Buffer.from(modifiedPDFBytes).toString('base64');
    setSignedPDF(modifiedPDFBase64);
    await saveSignedPDF(modifiedPDFBase64);
  };

  const handleSaveSignature = async signatureBase64 => {
    try {
      await addSignatureToPDF(signatureBase64);
      setIsSigned(true);
    } catch (error) {
      console.error('Erro ao salvar assinatura: ', error);
    }
  };

  const saveSignedPDF = async signedPDFBase64 => {
    const timestamp = new Date().toISOString();
    const newFileName = `signed_pdf_${timestamp}.pdf`;
    const newFilePath = `${RNFS.DocumentDirectoryPath}/${newFileName}`;

    await RNFS.writeFile(newFilePath, signedPDFBase64, 'base64');
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
      ) : (
        <Pdf
          source={{ uri: `data:application/pdf;base64,${signedPDF}` }}
          style={styles.pdf}
        />
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
