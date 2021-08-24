import React, { useEffect, useState } from 'react'
import { FlatList, Text, StyleSheet, Image, View, Alert, TouchableOpacity } from 'react-native';

export function List() {
    const [countries, setCountries] = useState([])
    const [dataCountry, setDataCountry] = useState(false)


    useEffect(()=>{

        const getCountries = async() =>{
            const res = await fetch("http://restcountries.eu/rest/v2/all");
            const data = await res.json();
            setCountries(data)

            
        }
        getCountries();
        
    },[])
    
    const handlePress = (id) =>{
        console.log("you hit me !")
        Alert.alert("you hit me !")
        setDataCountry(!dataCountry)
    };

    const renderCountrie = ({item}) =>{ 
        return (
        <View style={styles.dataCountrie}>
            <Text>{item.name}</Text>
            <View style={styles.dataCapital}>
                <Text style={styles.text}>{item.capital}</Text>
                {dataCountry && <>
                    <Text style={styles.text}>-</Text>
                    <Text style={styles.text}>Weather</Text>
                </>}
            </View>
            <TouchableOpacity onPress={handlePress}>
                <Image style={styles.countryFlag} source={{uri: item.flag}} />
            </TouchableOpacity>

        </View>)
    }

    return (
        <FlatList style={styles.list} data={countries} renderItem={renderCountrie} keyExtractor={(item, index)=> index.toString()}/>
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