import React from "react";
import { ScrollView } from "react-native";
import {
  Heading,
  Center,
  Text,
  Image,
  Box,
  VStack,
  AspectRatio,
} from "native-base";
import { Header } from "../components";

const placeholderImage =
  "https://via.placeholder.com/800x450.png?text=No+Image+Available";

const formatDate = (dateValue) => {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  if (isNaN(d)) return dateValue; // kalau sudah string ter-format, fallback
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const NewsDetail = ({ route }) => {
  // item yang dikirim saat navigate: navigation.navigate("NewsDetail", { item: news })
  const params = route.params?.item || {};

  // support beberapa nama properti image umum
  const imageUrl =
    params.image || params.imageUrl || params.thumbnail || params.photo || null;
  const title = params.title || "Untitled";
  const content = params.content || params.body || params.description || "";
  const date = params.date || params.publishedAt || params.createdAt || null;

  return (
    <>
      <Header title={"News"} withBack="true" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Center p="4">
          <VStack width="100%" space={4}>
            {/* Image / hero */}
            <Box width="100%" borderRadius="lg" overflow="hidden" bg="gray.100">
              <AspectRatio ratio={16 / 9}>
                <Image
                  source={{ uri: imageUrl || placeholderImage }}
                  alt={title}
                  resizeMode="cover"
                  width="100%"
                  height="100%"
                />
              </AspectRatio>
            </Box>

            {/* Title & date */}
            <VStack space={1} px="1">
              <Heading size="md">{title}</Heading>
              {date ? (
                <Text fontSize="sm" color="gray.500">
                  {formatDate(date)}
                </Text>
              ) : null}
            </VStack>

            {/* Content */}
            <Box px="1">
              <Text fontSize="md" textAlign="left" lineHeight={24}>
                {content}
              </Text>
            </Box>
          </VStack>
        </Center>
      </ScrollView>
    </>
  );
};

export default NewsDetail;
