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

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= (width*width-2*width-1); i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];
            //const isBlank = currentColorArrangement[i] === blank
            //&& !isBlank
            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor )) {
                //setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentColorArrangement[square] = 'rgba(0, 0, 0, 0)');
                //return true
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < width*width; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            //const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            // && !isBlank
            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor )) {
                //setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorArrangement[square] = 'rgba(0, 0, 0, 0)');
                //return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= (width*width-3*width-1); i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            //const isBlank = currentColorArrangement[i] === blank
            // && !isBlank
            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor )) {
                //setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentColorArrangement[square] = 'rgba(0, 0, 0, 0)')
                //return true
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            //const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue
            // && !isBlank
            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor )) {
                //setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorArrangement[square] = 'rgba(0, 0, 0, 0)')
                //return true
            }
        }
    }

    
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
    }, [width]);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100)
        return () => clearInterval(timer);
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, currentColorArrangement]);

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
