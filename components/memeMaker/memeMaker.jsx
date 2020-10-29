import React, { Component } from 'react';
import { Text, ScrollView, Image, StyleSheet, TextInput, View, Dimensions, Button } from 'react-native';
import { getMemeImg } from '../../api/memeApi';
import MultiSelect from 'react-native-multiple-select'

const items = [{
  id: '92iijs7yta',
  name: 'Ondo'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun'
}, {
  id: '16hbajsabsd',
  name: 'Calabar'
}, {
  id: 'nahs75a5sg',
  name: 'Lagos'
}, {
  id: '667atsas',
  name: 'Maiduguri'
}, {
  id: 'hsyasajs',
  name: 'Anambra'
}, {
  id: 'djsjudksjd',
  name: 'Benue'
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna'
}, {
  id: 'suudydjsjd',
  name: 'Abuja'
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
  }
});

class MemeMaker extends Component {
  constructor() {
    super();
    this.state = { 
      randomImg: '',
      topText: '',
      bottomText: '',
      selectedItems: []
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


  render() {
    const { selectedItems } = this.state

    return (
      <ScrollView>
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
            title="Send postcards!">
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default MemeMaker;