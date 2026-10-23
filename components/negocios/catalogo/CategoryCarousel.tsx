import { useRef } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";

type CategoryCarouselProps = {
  children: React.ReactNode;
  borderColor: string;
  buttonColor: string;
  textColor: string;
};

export function CategoryCarousel({
  children,
  borderColor,
  buttonColor,
  textColor,
}: CategoryCarouselProps) {
  const scrollRef = useRef<ScrollView>(null);

  const scroll = (direction: -1 | 1) => {
    scrollRef.current?.scrollTo({
      x: direction * 500,
      animated: true,
    });
  };

  return (
    <View style={{ position: "relative" }}>
      {Platform.OS === "web" && (
        <>
          <Pressable
            onPress={() => scroll(-1)}
            accessibilityRole="button"
            accessibilityLabel="Desplazar productos a la izquierda"
            style={{
              position: "absolute",
              zIndex: 2,
              left: 6,
              top: "45%",
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: buttonColor,
              borderWidth: 1,
              borderColor,
            }}
          >
            <Text style={{ color: textColor, fontSize: 22 }}>‹</Text>
          </Pressable>

          <Pressable
            onPress={() => scroll(1)}
            accessibilityRole="button"
            accessibilityLabel="Desplazar productos a la derecha"
            style={{
              position: "absolute",
              zIndex: 2,
              right: 6,
              top: "45%",
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: buttonColor,
              borderWidth: 1,
              borderColor,
            }}
          >
            <Text style={{ color: textColor, fontSize: 22 }}>›</Text>
          </Pressable>
        </>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: Platform.OS === "web" ? 44 : 0,
          paddingRight: 44,
          paddingBottom: 6,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}
