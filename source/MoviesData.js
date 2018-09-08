import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Text, Image, StyleSheet, Dimensions} from 'react-native';
import LikeButton from './LikeButton';
const { width, height } = Dimensions.get('window');
const cols = 3, rows = 3;


export default class MoviesData extends Component {
  
    constructor(props){
      super(props);
      this.state ={ isLoading: true,
                    dataSource: {} 
                  };   
    }

    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }
      
    componentDidMount(){
      return fetch('https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log (responseJson)
  
          this.setState({
            isLoading: false,
            dataSource: responseJson
          }, function(){
            console.log ('katia')
            console.log (responseJson)
          });
  
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    render(){
   
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
      )
      } 

      return(
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList 
            data ={this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}

            renderItem={({item}) => 
            <View style={styles.container}>

            <Image 
            style={styles.image}
            source = {{uri: item.image}} 
            key={item.uri}
            /> 
            <Text>{item.title}, {item.genre}</Text>
            
            <Text>{item.price}, {item.date} </Text>}
            </View>
            }
            keyExtractor={item => item._id.$oid}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
      marginBottom: 10,
      height: (height - 20 - 20) / rows - 10,
      width: (width - 10) / cols - 10,
    },
    image: {
      borderRadius: 10,
      width: 100,
      height: 150,                  
    },
    title: {
      
    },
    genre: {
      
    },
  });