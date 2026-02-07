import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForOperand(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      case '%':
        return (prev * current) / 100;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    const num = parseFloat(display);
    setDisplay(String(num * -1));
  };

  const Button = ({ value, onPress, style, textStyle }: any) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <Text style={styles.display}>{display}</Text>
      </View>

      <ScrollView style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button value="C" onPress={handleClear} style={styles.functionButton} />
          <Button value="⌫" onPress={handleDelete} style={styles.functionButton} />
          <Button value="%" onPress={() => handleOperation('%')} style={styles.functionButton} />
          <Button value="÷" onPress={() => handleOperation('÷')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button value="7" onPress={() => handleNumber('7')} />
          <Button value="8" onPress={() => handleNumber('8')} />
          <Button value="9" onPress={() => handleNumber('9')} />
          <Button value="×" onPress={() => handleOperation('×')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button value="4" onPress={() => handleNumber('4')} />
          <Button value="5" onPress={() => handleNumber('5')} />
          <Button value="6" onPress={() => handleNumber('6')} />
          <Button value="-" onPress={() => handleOperation('-')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button value="1" onPress={() => handleNumber('1')} />
          <Button value="2" onPress={() => handleNumber('2')} />
          <Button value="3" onPress={() => handleNumber('3')} />
          <Button value="+" onPress={() => handleOperation('+')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button value="±" onPress={handleToggleSign} style={styles.functionButton} />
          <Button value="0" onPress={() => handleNumber('0')} style={styles.zeroButton} />
          <Button value="." onPress={handleDecimal} />
          <Button value="=" onPress={handleEquals} style={styles.equalsButton} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  displayBox: {
    backgroundColor: '#2d2d2d',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  display: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#3d3d3d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  operationButton: {
    backgroundColor: '#ff9500',
  },
  functionButton: {
    backgroundColor: '#404040',
  },
  equalsButton: {
    backgroundColor: '#34c759',
  },
  zeroButton: {
    flex: 2,
  },
});
