import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const width = 8;
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow' 
];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

    const createBoard = () => {
        const randomColorArrangement = [];
        for (let i = 0; i < width * width; i++) {
            const randomNumber = Math.floor(Math.random() * candyColors.length)
            const randomColor = candyColors[randomNumber];
            randomColorArrangement.push(randomColor);
        }            
        setCurrentColorArrangement(randomColorArrangement);
    }

    useEffect(() => {
        createBoard();
    },[width])

    //console.log(currentColorArrangement);

    return (
        <View style={styles.container}>
            <View style={styles.game}>
                { currentColorArrangement.map((candyColor, index) => (
                    
                    <Image
                        key={index}
                        style={{
                            backgroundColor: candyColor,
                            width: (windowWidth-20)/width,
                            height: (windowWidth-20)/width,
                            borderRadius: 30,
                            margin: 1,
                        }}
                    />
                    
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#afd6ff'
    },

    game: {
        width: windowWidth,
        height: windowWidth,
        display: 'flex',
        flexWrap: 'wrap',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#01abff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        color: '#000000',
    }
});
