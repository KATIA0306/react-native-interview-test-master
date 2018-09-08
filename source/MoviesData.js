import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Text, Image} from 'react-native';

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
            <View style={{flex:1, flexDirection: 'row'}}>

            <Image 
            style= {{width: 200, height: 200}}
            source = {{uri: 'https://dummyimage.com/1459x751.png/cc0000/ffffff'}} 
            key={item.uri}
            /> 
            <Text>{item.title}, {item.genre}, {item.price}, {item.date} </Text>}
            </View>
            }
            keyExtractor={item => item._id.$oid}
          />
        </View>
      );
    }
  }