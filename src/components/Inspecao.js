import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import RNFS from 'react-native-fs';

const Inspecao = ({ setFile, navigation }) => {
  const [inspectionA, setInspectionA] = useState('non-compliant');
  const [inspectionB, setInspectionB] = useState('non-compliant');
  const [inspectionC, setInspectionC] = useState('non-compliant');

  const handleFinishInspection = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage([600, 400]);
    const fontSize = 14;

    page.drawText(`Inspeção A: ${inspectionA}`, {
      x: 50,
      y: 350,
      font: timesRomanFont,
      size: fontSize,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText(`Inspeção B: ${inspectionB}`, {
      x: 50,
      y: 320,
      font: timesRomanFont,
      size: fontSize,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText(`Inspeção C: ${inspectionC}`, {
      x: 50,
      y: 290,
      font: timesRomanFont,
      size: fontSize,
      color: rgb(0, 0.53, 0.71),
    });

    pdfDoc.saveAsBase64().then(pdfBytes => {
      const filePath = `${RNFS.ExternalDirectoryPath}/inspection_results.pdf`;
      console.log('-----> ', filePath);
      console.log('-----> ', pdfBytes);
      RNFS.writeFile(filePath, pdfBytes, 'base64')
        .then(success => {
          console.log('FILE WRITTEN! -> ', filePath);
          setFile(filePath);
          navigation.navigate('Home')
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inspeção A</Text>
      <RadioButton.Group
        onValueChange={value => setInspectionA(value)}
        value={inspectionA}>
        <View style={styles.radioButton}>
          <Text>Conforme</Text>
          <RadioButton value="compliant" />
        </View>
        <View style={styles.radioButton}>
          <Text>Não conforme</Text>
          <RadioButton value="non-compliant" />
        </View>
      </RadioButton.Group>

      <Text style={styles.title}>Inspeção B</Text>
      <RadioButton.Group
        onValueChange={value => setInspectionB(value)}
        value={inspectionB}>
        <View style={styles.radioButton}>
          <Text>Conforme</Text>
          <RadioButton value="compliant" />
        </View>
        <View style={styles.radioButton}>
          <Text>Não conforme</Text>
          <RadioButton value="non-compliant" />
        </View>
      </RadioButton.Group>

      <Text style={styles.title}>Inspeção C</Text>
      <RadioButton.Group
        onValueChange={value => setInspectionC(value)}
        value={inspectionC}>
        <View style={styles.radioButton}>
          <Text>Conforme</Text>
          <RadioButton value="compliant" />
        </View>
        <View style={styles.radioButton}>
          <Text>Não conforme</Text>
          <RadioButton value="non-compliant" />
        </View>
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={handleFinishInspection}
        style={styles.finishButton}>
        Finalizar Inspeção
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  finishButton: {
    marginTop: 20,
  },
});

export default Inspecao;
