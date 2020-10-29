import React, { Component } from 'react';
import { Text, ScrollView, Image, StyleSheet, TextInput, View, Dimensions } from 'react-native';
import { getMemeImg } from '../../api/memeApi';

const deviceWidth = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
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
  }
});


class MemeMaker extends Component {
  constructor() {
    super();
    this.state = { 
      randomImg: '',
      topText: '',
      bottomText: '',
    };
  }

  async componentDidMount() {
    const response = await getMemeImg();
    const smallMemes = response.filter((meme => {
      return meme.height < 450 && meme.width < 400;
    }))
    this.setState({ randomImg: response[Math.floor(Math.random() * response.length)] });
  }

  render() {
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
      </ScrollView>
    );
  }
}
export default MemeMaker;