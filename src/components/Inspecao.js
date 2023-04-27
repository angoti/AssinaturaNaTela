import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';
import { PDFDocument, rgb } from 'pdf-lib';
import RNFS from 'react-native-fs';

const Inspecao = () => {
  const [inspectionA, setInspectionA] = useState('non-compliant');
  const [inspectionB, setInspectionB] = useState('non-compliant');
  const [inspectionC, setInspectionC] = useState('non-compliant');

  const handleFinishInspection = async () => {
    const pdfDoc = new PDFDocument();

    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
    const fontSize = 14;

    page.drawText(`Inspeção A: ${inspectionA}`, {
      x: 50,
      y: 350,
      font,
      size: fontSize,
    });

    page.drawText(`Inspeção B: ${inspectionB}`, {
      x: 50,
      y: 320,
      font,
      size: fontSize,
    });

    page.drawText(`Inspeção C: ${inspectionC}`, {
      x: 50,
      y: 290,
      font,
      size: fontSize,
    });

    const pdfBytes = await pdfDoc.save();
    const filePath = `${RNFS.DocumentDirectoryPath}/inspection_results.pdf`;
    await RNFS.writeFile(filePath, pdfBytes, 'binary');
    console.log(`Resultados da inspeção salvos em: ${filePath}`);
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
