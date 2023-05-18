import React, { useState, useContext, useEffect,useLayoutEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Item,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../global/baseUrl";
import { AppContext } from "../../global/AppContext";
import LoadingAnimation from "../../components/LoadingAnimation";
import { ApiInterceptor } from "../../interseptors/apiBodyPost";


function ItemDetailsScreen({ route }) {
  const { itemId, itemName  } = route.params;
  const { token, lastSavedRegNumber } = useContext(AppContext);
  const [itemListLoading, setItemListLoading] = useState(false);
  const [itemdetal, setItemdetal] = useState(null);

  const navigation = useNavigation();

console.log('lastsavednumber', lastSavedRegNumber)

  useEffect(() => {
    navigation.setOptions({
      title: itemName,
      headerTitleStyle: {
        fontSize: 25,
        color:'#0080FE'
      },
     });
  }, []);
  
  
  useEffect(() => {
    fetchData();
  }, []);

  const handlebook = () => {
    try{
        ApiInterceptor('/api/order',token, { registrationNumber:lastSavedRegNumber,productId:itemId , quantity: 1, })
        .then((response) => response.json())
              .then((data) => {
                alert(data.message)
               console.log('responce', data)
               
              })
             
              .catch((error) => {
                console.log(error);
                alert(error)
              });
            } catch (error) {
              console.log(error);
              alert(error);
            
            }
              
       
      };
  const fetchData = () => {
    setItemListLoading(true);
    fetch(`${API_URL}/api/products/id/${itemId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItemdetal(data)
       
       
        setItemListLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setItemListLoading(false);
      });
  };

  return (
   // ...

<View style={styles.container}>
{itemListLoading ? (
        <View>
          <LoadingAnimation
            source={require("../../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : (

<>
  {itemdetal && (
    <>
      {/* Item Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardText}>{itemdetal.name}</Text>
        <Text style={styles.cardText}>{itemdetal.description}</Text>
        <Text style={styles.cardTitle}>Price: {itemdetal.price}</Text>
        <TouchableOpacity onPress={handlebook} style={styles.book}>
              <Text style={styles.bookText}>Book it now</Text>
            </TouchableOpacity>
      </View>

      {/* Address Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Address</Text>
        
        {itemdetal.provider && (
          <>
            <Text style={styles.cardText}>Street: {itemdetal.provider.address}</Text>
            <Text style={styles.cardText}>City: {itemdetal.provider.city}</Text>
            <Text style={styles.cardText}>Postal Code: {itemdetal.provider.postalCode}</Text>
            <Text style={styles.cardText}>Organization Name: {itemdetal.provider.organizationName}</Text>
          </>
        )}
      </View>
    </>
  )}
  </>
  )}
</View>

// ...

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#141B41",
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  book:{
    backgroundColor:  "#9ACD32",
    marginTop: 15,
    width: Platform.OS == "android" ? '35%' : '30%',
    borderRadius: 5,
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:195,
    },

    bookText:{
      color:'#FFFFFF',
    fontSize:13,
    
    },
});
  //console.log('screen name', screenName)

  /* useEffect(() => {
    fetchData();
  }, []); */

  /* const fetchData = () => {
    setItemListLoading(true);
    fetch(`${API_URL}/api/products/id/${itemId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
       
        setItemdetal(data);
        setItemdetal(data.categories);
        setItemListLoading(false);
       console.log("item DetaiList data", data);
       

      })
      .catch((error) => {
        console.log(error);
        setItemListLoading(false);
      });
  }; */
  //******* */
 /*  const CircleCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={()=>{alert('service has been booked')}}>
        
        <Text style={styles.cardTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  }; */
  
  //******* */

 /*  const Item = ({ item }) => (
    <View>
     <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="caret-forward-outline"
            type="Ionicons"
          />
          : <Text>{item.name}</Text>
        </Text>
    </View>
  ); */
  //{  }
 /*  const Card = () => (

    <>
    
   <View style={styles.container}>
      {itemdetalArray.map((item, index) => (
        <React.Fragment key={item.id}>
          {index === 3 && (
            <View style={styles.row}>
              <CircleCard key={item.id} item={item} />
            </View>
          )}
          {index < 3 && <CircleCard key={item.id} item={item} />}
        </React.Fragment>
      ))}
    </View>
    <View style={[styles.card, styles.listBody]}>
    
      <ScrollView>
       
        

        <Text style={styles.heading}>Contact Us</Text>
        
        <View >
        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="person-outline"
            type="Ionicons"
          />
          : <Text>{itemdetal.firstName}</Text>
        </Text>
        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="person-outline"
            type="Ionicons"
          />
          : <Text>{itemdetal.lastName}</Text>
          </Text>
       { itemdetal.address ?
        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="home-outline"
            type="Ionicons"
          />
          : <Text>{itemdetal.address}</Text>
        </Text> : null } 
        { itemdetal.city ?
        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="home-outline"
            type="Ionicons"
          />
          : <Text>{itemdetal.city}</Text>
        </Text> : null }

        { itemdetal.postalCode?
        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="home-outline"
            type="Ionicons"
          />
          : <Text>{itemdetal.postalCode}</Text>
        </Text> : null }


        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="call-outline"
            type="Ionicons"
          />
          : <Text>{itemdetal.phoneNumber}</Text>
        </Text>
        
        <View style={styles.line} /></View>
        {/* <TouchableOpacity onPress={()=>{alert('Service has been booked')}} style={styles.book}>
              <Text style={styles.bookText}>Book it now</Text>
            </TouchableOpacity> */

      /* </ScrollView>
    </View>
    </>
  ); */ 

  /* return (
    <View style={styles.mainContainer}>
      {itemListLoading ? (
        <View>
          <LoadingAnimation
            source={require("../../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : (
        <>{Card()}</>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#141B41",
    width: "100%",
    height: "100%",
  },
  listBody: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 380,
    height:420,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0.5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginTop:1 ,
    marginBottom:115,
  },
  heading: {
    fontSize: 22,
    marginLeft: 50,
    color: "#FFFFFFf",
    marginBottom: 17,
    marginTop: 15,
  },
  card: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
  textValues: {
    
    marginBottom: 15,
    fontSize: 20,
   },
   line: {
    borderBottomWidth: .7,
    borderBottomColor: 'gray',
    marginTop:15,
    
  },
  book:{
      backgroundColor:  "#9ACD32",
      marginTop: 15,
      width: '100%',
      borderRadius: 5,
      padding: 10,
      justifyContent:'center',
      alignItems:'center',
      },

      bookText:{
        color:'#FFFFFF',
      fontSize:25,
      
      },
      round:{
        marginTop:20,
        backgroundColor:'white'
      },
      //******* */
      /* container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141B41',
        flexWrap: 'wrap',
        marginTop:50,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      card: {
        width: 118,
        height: 118,
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
  paddingHorizontal:15,


        
       
      },
      cardImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
      },
      cardTitle: {
        fontSize: 15,
       
      },

}); */ 
export default ItemDetailsScreen;
