import * as React from "react";
import { ScrollView, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Star from "../assets/Star.png";

const Restaurant = ({ route }) => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <View style={[styles.restaurant]}>
          <Image source={route.params.image} style={[styles.image]} />
          <View style={[styles.details]}>
            <View style={[styles.text]}>
              <Text style={[styles.name]}>{route.params.name}</Text>
              {route.params.rating ? (
                <View style={[styles.row]}>
                  <Text style={[styles.rating]}>{route.params.rating}</Text>
                  <Image source={Star} style={styles.star} />
                </View>
              ) : (
                <Text>No ratings</Text>
              )}
              <Text style={[styles.location]} numberOfLines={1}>
                {route.params.location}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Reserving", {
                    restaurant_id: route.params.restaurant_id,
                    name: route.params.name,
                    rating: route.params.rating,
                    location: route.params.location,
                    deposit: route.params.deposit,
                    image: route.params.image,
                  })
                }
              >
                <Text style={[styles.link]}>Reserve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Rating", {
                    restaurant_id: route.params.restaurant_id,
                    name: route.params.name,
                    rating: route.params.rating,
                    location: route.params.location,
                    deposit: route.params.deposit,
                    image: route.params.image,
                  })
                }
              >
                <Text style={[styles.link]}>Rate</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.cost]}>
            Average per person: ${route.params.deposit}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Ratings", {
                restaurant_id: route.params.restaurant_id,
                name: route.params.name,
                image: route.params.image,
              })
            }
          >
            <Text style={[styles.link]}>Ratings & Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Menu", {
                restaurant_id: route.params.restaurant_id,
                name: route.params.name,
                image: route.params.image,
              })
            }
          >
            <Text style={[styles.link]}>View menu</Text>
          </TouchableOpacity>
          <Text style={[styles.link]}>Contact</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  restaurant: {
    width: 310,
    marginVertical: 40,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 230,
    borderRadius: 15,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  text: {
    justifyContent: "center",
    flexBasis: "40%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: 20,
  },
  location: {
    fontSize: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  star: {
    height: 20,
    width: 20,
  },

  link: {
    textDecorationLine: "underline",
    fontSize: 20,
    color: "#D43325",
  },
  cost: {
    fontSize: 20,
  },
});

export default Restaurant;
