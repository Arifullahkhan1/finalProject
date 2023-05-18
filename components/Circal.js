/* import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  {
    id: 1,
    title: 'Card 1',
    image: require('../resources/images/car.png'),
  },
  {
    id: 2,
    title: 'Card 2',
    image: require('../resources/images/car.png'),
  },
  {
    id: 3,
    title: 'Card 3',
    image: require('../resources/images/carLogo.png'),
  },
];

const CircleCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=>{alert('love you')}}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const Circal = () => {
  return (
    <View style={styles.container}>
     
      {data.map((item) => (
        <CircleCard key={item.id} item={item} />
      ))}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141B41',
  },
  card: {
    width: 110,
    height: 110,
    borderRadius: 75,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  swiper: {
    flex: 1,
  },
});

export default Circal; */

/* import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';

const data = [
  {
    title: 'Card 1',
    backgroundColor: '#000000',
  },
  {
    title: 'Card 2',
    backgroundColor: '#000000',
  },
  {
    title: 'Card 3',
    backgroundColor: '#',
  },
];

const CircularCardsHorizontal = () => {
  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        style={styles.swiper}
        containerStyle={styles.swiperContainer}
        >
        {data.map((card, index) => (
          <Card key={index} containerStyle={[styles.card, { backgroundColor: card.backgroundColor }]}>
            <Card.Title>{card.title}</Card.Title>
          </Card>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {
    flex: 1,
  },
  swiperContainer: {
    height: 200,
  },
  card: {
    borderRadius: 50,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularCardsHorizontal;
 */