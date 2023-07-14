import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
import PropTypes from "prop-types"
import TextComponent from '../TextComponent';


const ChoosingList = (props) => {

  const {modalVisible,setModalVisible, options, selectedOption, setSelectedOption } = props

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  const RadioButtonHandler = ({choix}) => {
      const currentReponse = options.find(option => option === selectedOption)
      return (
      <View style={{ ...styles.radioContainer, borderColor: currentReponse == choix ? colors.indigo : colors.lightGrey }} >
        <View style={{ ...styles.radio, backgroundColor: currentReponse == choix ? colors.indigo : colors.lightGrey }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedOptionText}>{selectedOption ? selectedOption.label : 'Select an option'}</Text>
      </TouchableOpacity> */}
      <Modal visible={modalVisible} transparent>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
              >
                <RadioButtonHandler choix={option}/>
                <TextComponent text={option} size={16} />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  selectedOptionText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 4,
  },
  optionButton: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  radioContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});

export default ChoosingList;

ChoosingList.propTypes = {
    options : PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOption : PropTypes.string.isRequired,
    setSelectedOption : PropTypes.func.isRequired,
    modalVisible : PropTypes.bool.isRequired,
    setModalVisible : PropTypes.func.isRequired,
}