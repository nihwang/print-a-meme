import React, { Component } from 'react';
import { Text, ScrollView, Image, StyleSheet, TextInput, View, Dimensions, Button, Modal, TouchableHighlight } from 'react-native';
import { getMemeImg } from '../../api/memeApi';
import MultiSelect from 'react-native-multiple-select'

const items = [{
  id: '92iijs7yta',
  name: 'Larry Lobster'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Sherlock Holmes'
}, {
  id: '16hbajsabsd',
  name: 'Harry Potter'
}]

const deviceWidth = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 16,
  },
  memeText: {
    position: 'absolute',
    width: deviceWidth,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Verdana-Bold',
    textTransform: 'uppercase',
    color: 'white',
    textShadowColor:'#585858',
    textShadowOffset:{width: -2, height: -2},
    textShadowOffset:{width: -2, height: 2},
    textShadowOffset:{width: 2, height: -2},
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius: 2,
  },
  topText: {
    top: 16,
  },
  bottomText: {
    bottom: 16,
  },
  multiSelectContainer: {
    marginTop: 16,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

class MemeMaker extends Component {
  constructor() {
    super();
    this.state = { 
      randomImg: '',
      topText: '',
      bottomText: '',
      selectedItems: [],
      successModal: false,
    };
  }

  async componentDidMount() {
    const response = await getMemeImg();
    const smallMemes = response.filter((meme => {
      return meme.height < 450 && meme.width < 400;
    }))
    this.setState({ randomImg: response[Math.floor(Math.random() * response.length)] });
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems }, () => console.warn('Selected Items: ', selectedItems))
  }

  onButtonSubmit = () => {
    this.setState({
      successModal: true
    })
  }


  render() {
    const { selectedItems, successModal } = this.state

    return (
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={successModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Postcards sent!</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setState({successModal: false});
                }}
              >
                <Text style={styles.textStyle}>Exit Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View>
          <Image
            source={{uri: this.state.randomImg.url}}
            style={{width: deviceWidth, height: deviceWidth, position: 'relative'}}>
          </Image>
          <Text style={[styles.topText, styles.memeText]}>{this.state.topText}</Text>
          <Text style={[styles.bottomText, styles.memeText]}>{this.state.bottomText}</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Top text"
          onChangeText={text => this.setState({topText: text})}
          defaultValue={this.state.topText}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Bottom Text"
          onChangeText={text => this.setState({bottomText: text})}
          defaultValue={this.state.bottomText}
        />
        <View style={styles.container}>
          <View style={styles.multiSelectContainer}>
            <MultiSelect
              items={items}
              uniqueKey='id'
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText='Pick Contacts'
              searchInputPlaceholderText='Search contacts...'
              onChangeInput={(text) => console.warn(text)}
              tagRemoveIconColor='#000'
              tagBorderColor='#000'
              tagTextColor='#000'
              selectedItemTextColor='#000'
              selectedItemIconColor='#000'
              itemTextColor='#000'
              displayKey='name'
              searchInputStyle={{ color: '#000', height: 32, padding: 4 }}
              styleInputGroup={{ marginTop: 16, marginBottom: 16, padding: 4}}
              styleMainWrapper={{ paddingTop: 8}}
              styleSelectorContainer={{ marginBottom: 0}}
              submitButtonColor='#000'
              submitButtonText='Select'
              removeSelected
            />
          </View>
        </View>
        <View style={{backgroundColor: 'black'}}>
          <Button
            style={{
              marginTop: 24,
              padding: 8,
            }}
            color="white"
            title="Send postcards!"
            onPress={this.onButtonSubmit}
            >
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default MemeMaker;