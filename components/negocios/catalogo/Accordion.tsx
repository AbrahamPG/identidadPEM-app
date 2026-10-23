import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { ui } from "@/src/styles/negocios/(tabs)/catalog-managments.styles";

export type CatalogSectionId = "products" | "info" | "photos" | "hours";

type AccordionProps = {
  title: string;
  subtitle: string;
  icon: string;
  expanded: boolean;
  onPress: () => void;
  children?: ReactNode;
};

export function Accordion({
  title,
  subtitle,
  icon,
  expanded,
  onPress,
  children,
}: AccordionProps) {
  return (
    <View style={ui.accordion}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        style={({ pressed }) => [
          ui.accordionHeader,
          pressed && { opacity: 0.75 },
        ]}
      >
        <View style={ui.accordionIcon}>
          <Text style={{ fontSize: 21 }}>{icon}</Text>
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={ui.accordionTitle}>{title}</Text>
          <Text style={ui.accordionSubtitle}>{subtitle}</Text>
        </View>
        <Text style={ui.chevron}>{expanded ? "⌃" : "⌄"}</Text>
      </Pressable>
      <View style={[ui.accordionBody, !expanded && { display: "none" }]}>
        {children}
      </View>
    </View>
  );
}
