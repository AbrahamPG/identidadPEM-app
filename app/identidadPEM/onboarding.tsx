import { styles } from "@/src/styles/onboarding.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const ONBOARDING_KEY = "@identidadpem/onboarding-completed";

const slides = [
  {
    eyebrow: "BIENVENIDO A NUESTRA TIERRA",
    title: "Descubre lo nuestro.",
    description:
      "Conoce los lugares, negocios y experiencias que hacen única a nuestra ciudad.",
    image: require("../../assets/images/onboarding-selva.jpg"),
  },
  {
    eyebrow: "TU CIUDAD, MÁS CERCA",
    title: "Tu próxima aventura empieza aquí.",
    description:
      "Explora rincones amazónicos, encuentra servicios y descubre nuevas experiencias.",
    image: require("../../assets/images/onboarding-rio.jpg"),
  },
  {
    eyebrow: "CONECTA CON LO LOCAL",
    title: "Lo mejor está en nuestra gente.",
    description:
      "Apoya a los negocios locales y descubre nuevas razones para disfrutar Puerto Maldonado.",
    image: require("../../assets/images/onboarding-local.jpg"),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  // En web entramos directamente a la aplicación.
  useEffect(() => {
    if (Platform.OS === "web") {
      router.replace("/identidadPEM");
    }
  }, [router]);

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    } catch (error) {
      console.error("No se pudo guardar el onboarding:", error);
    } finally {
      router.replace("/identidadPEM");
    }
  };

  const goNext = () => {
    if (currentIndex === slides.length - 1) {
      void finishOnboarding();
      return;
    }

    scrollRef.current?.scrollTo({
      x: (currentIndex + 1) * width,
      animated: true,
    });

    setCurrentIndex((previous) => previous + 1);
  };

  const handleScrollEnd = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    setCurrentIndex(Math.max(0, Math.min(nextIndex, slides.length - 1)));
  };

  // Evita mostrar fugazmente el onboarding en el navegador.
  if (Platform.OS === "web") {
    return <View style={styles.webFallback} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.eyebrow} style={{ width, height }}>
            <ImageBackground
              source={slide.image}
              style={styles.backgroundImage}
              imageStyle={styles.backgroundImageContent}
              resizeMode="cover"
            >
              {/* Oscurece suavemente la foto para mejorar la lectura. */}
              <View pointerEvents="none" style={styles.imageOverlay} />

              {/* Encabezado */}
              <View style={styles.header}>
                <View style={styles.brand}>
                  <View style={styles.brandMark}>
                    <Text style={styles.brandMarkText}>I</Text>
                  </View>

                  <Text style={styles.brandName}>
                    Identidad<Text style={styles.brandAccent}>PEM</Text>
                  </Text>
                </View>

                {index < slides.length - 1 && (
                  <Pressable
                    onPress={() => void finishOnboarding()}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Omitir introducción"
                  >
                    <Text style={styles.skipText}>Omitir</Text>
                  </Pressable>
                )}
              </View>

              {/* Contenido inferior sobre la fotografía */}
              <View style={styles.bottomContent}>
                <Text style={styles.eyebrow}>{slide.eyebrow}</Text>

                <Text style={styles.title}>{slide.title}</Text>

                <Text style={styles.description}>{slide.description}</Text>

                {/* Indicadores de las tres diapositivas */}
                <View
                  style={styles.pagination}
                  accessibilityLabel={`Pantalla ${index + 1} de ${slides.length}`}
                >
                  {slides.map((item, dotIndex) => (
                    <View
                      key={item.eyebrow}
                      style={[
                        styles.dot,
                        dotIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>

                <Pressable
                  onPress={goNext}
                  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                  ]}
                  accessibilityRole="button"
                >
                  <Text style={styles.buttonText}>
                    {index === slides.length - 1
                      ? "Explorar Puerto Maldonado"
                      : "Continuar"}
                  </Text>

                  <Text style={styles.buttonArrow}>→</Text>
                </Pressable>

                <Text style={styles.location}>MADRE DE DIOS · PERÚ</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
