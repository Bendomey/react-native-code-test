import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { IBlogPost } from "../../interfaces/blog";

interface Props {
  data: IBlogPost;
  onPress: () => void;
}

export const BlogPostCard: FC<Props> = ({ data, onPress }) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <Image
            source={{ uri: data.imageUrl }}
            style={{ flex: 1, borderRadius: 20, height: "100%", width: "100%" }}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: RFValue(200),
    width: RFValue(150),
    marginHorizontal: RFValue(7),
    marginBottom: RFValue(15),
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#fff",
  },
  innerContainer: {
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(7),
    borderRadius: 20,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
