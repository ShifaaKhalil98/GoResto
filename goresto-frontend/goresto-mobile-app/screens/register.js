import React, { useState } from "react";
import axios from "axios";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import Logo from "../assets/Logo.png";
import NavBar from "../components/navBar";
import { URL } from "../configs/URL";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      isValid = false;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
      isValid = false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleChangeText = () => {
    if (validateForm) {
      setError("");
    }
  };

  // async function saveData(key, value) {
  //   try {
  //     await AsyncStorage.setItem(key, JSON.stringify(value));
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // }

  // async function getData(key) {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     return value !== null ? JSON.parse(value) : null;
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
  // }

  // async function registerUser(data) {
  //   try {
  //     const response = await axios.post(
  //       `http://127.0.0.1:8000/api/register/customer`,
  //       data
  //     );
  //     const { user, authorisation } = response.data;
  //     // await saveData("name", user.name);
  //     // await saveData("token", authorisation.token);
  //     return { success: true };
  //   } catch (error) {
  //     console.error("Error registering user:", error);
  //     return { success: false, error: "An error occurred" };
  //   }
  // }

  const handleSubmit = () => {
    if (validateForm()) {
      const data = { name, email, password, confirmPassword };
      axios
        .post("http://127.0.0.1:8000/api/register/customer", data)
        .then((response) => {
          console.log("registered");
          // navigation.navigate("Setup");
          // localStorage.setItem("name", response.data.user.name);
          // localStorage.setItem("token", response.data.authorisation.token);
        })
        .catch((error) => {
          console.error(error);
          setError("Email already exists");
        });
    } else console.log(error);
  };

  return (
    <View style={[styles.container]}>
      {/* <NavBar /> */}
      <Image source={Logo} style={[styles.heading]} />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <View style={[styles.form]}>
        <Input
          title="Name"
          placeHolder="John Doe"
          value={name}
          onChangeText={(text) => {
            setName(text);
            handleChangeText();
          }}
        />
        <Input
          title="Email"
          placeHolder="example@domain.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleChangeText();
          }}
        />
        <Input
          title="Password"
          placeHolder="********"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleChangeText();
          }}
        />
        <Input
          title="Confirm password"
          placeHolder="********"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            handleChangeText();
          }}
        />
      </View>
      <MyButton title="Register" onPress={handleSubmit} />
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <MyLink
          title="Sign in instead"
          onPress={() => navigation.replace("Signin")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    width: 120,
    height: 70,
    marginBottom: 40,
    marginTop: 20,
  },
  form: {
    marginBottom: 10,
  },
  row: {
    width: 310,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: "#D43325",
    borderRadius: 8,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "white",
  },
});

export default Register;
