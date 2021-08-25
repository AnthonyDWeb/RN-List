import { log } from 'async';
import React, { useEffect, useState } from 'react'
import { FlatList, Text, StyleSheet, Image, View, Alert, TouchableOpacity } from 'react-native';
import WeatherApi from './WeatherApi';

export function List() {
    const [countries, setCountries] = useState([])
    const [weatherCapital, setWeatherCapital] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [capitalSelected, setCapitalSelected] = useState("")


    useEffect(()=>{

        const getCountries = async() =>{
            const res = await fetch("http://restcountries.eu/rest/v2/all");
            const data = await res.json();
            setCountries(data)

            
        }
        getCountries();
        
        if (countries.capital === capitalSelected){
            console.log('country selected3' , capitalSelected);
        }
        console.log('country selected2' , capitalSelected);
        console.log('weather' , weatherCapital);

    },[isShown])
    

    const capitalWeather = async(item) => {
            console.log('country capital' , item.capital);
            console.log('country selected1' , capitalSelected);
            const capitalInformation = await WeatherApi(item.capital);
                console.log('capital information' , capitalInformation);
            if (capitalInformation.message) {
                alert("sorry, retry a bit later !")
            } else {
                setWeatherCapital(capitalInformation.weather[0].main);
            }
            
        }
        
        const handlePress = (item) =>{
        setCapitalSelected(item.capital)
        console.log("you hit me !")
        capitalWeather(item)
        Alert.alert("you hit me !")
        setIsShown(true)
    };
    
    const renderCountry = ({item}) =>{ 
        
        return (
            <View style={styles.dataCountrie}>
                <Text>{item.name}</Text>
                <View style={styles.dataCapital}>
                    {(isShown && capitalSelected === item.capital) && <>
                        <Text style={styles.text}>{item.capital}</Text>
                        <Text style={styles.text}>-</Text>
                        <Text style={styles.text}>{weatherCapital}</Text>
                    </>}
                </View>
                <TouchableOpacity capital={item.capital} onPress={() => handlePress(item)}>
                    <Image style={styles.countryFlag} source={{uri: item.flag}} />
                </TouchableOpacity>

            </View>
        )

    }

    return (
        <FlatList style={styles.list} data={countries} renderItem={renderCountry} keyExtractor={(item, index)=> index.toString()}/>
    )
}

const styles = StyleSheet.create({
    list:{
        margin: 10,
    },
    text:{
        marginHorizontal: 5,
    },
    dataCountrie:{
        marginVertical: 10,
    },
    dataCapital:{
       flexDirection: "row" ,
    },
    countryFlag:{
        height: 50,
        width: 100,
    },
})