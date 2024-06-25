import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const CustomSelect = ({ data, onSelect,title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
    //  console.log("DATA SELECt ",data)
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    onSelect(item); // Enviar el elemento seleccionado al componente padre
    closeModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={{borderColor:"#00b894",borderWidth:2,borderRadius:10,backgroundColor:"#00b894",padding:10}}>
        <Text style={{textAlign:"center",color:"white"}}>{title}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingVertical:50 }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item,index }) => (
                <TouchableOpacity onPress={() => handleItemSelect(item)} style={{paddingVertical:8}}>
                  <Text >{index+1}.- {item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={{alignSelf:"center"}}>
            <TouchableOpacity onPress={closeModal} style={{alignSelf:"center"}}>
              <Text style={{alignSelf:"center"}}>Cancelar</Text>
            </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      <Text style={{textAlign:"center",fontSize:25,fontWeight:"900"}}>{selectedItem.nombre}</Text>
    </View>
  );
};

export default CustomSelect;
