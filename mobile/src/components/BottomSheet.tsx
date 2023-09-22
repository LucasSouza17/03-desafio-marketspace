import { useMemo, useCallback, Ref, RefObject } from "react";
import { TouchableOpacity } from "react-native";
import { default as BottomSheetComponent } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { HStack, Text, View, useTheme } from "native-base";
import { X } from "phosphor-react-native";

type Props = {
  children: React.ReactNode;
  refBottomSheet: RefObject<BottomSheetComponent>;
  title: string;
};

export function BottomSheet({ children, refBottomSheet, title }: Props) {
  const { colors } = useTheme();

  const snapPoints = useMemo(() => ["70%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <Portal>
      <BottomSheetComponent
        ref={refBottomSheet}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        containerStyle={{ zIndex: 1 }}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: colors.gray[400] }}
      >
        <View w="100%" p="6">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" color="gray.700" fontFamily="heading">
              {title}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => refBottomSheet.current?.close()}
            >
              <View>
                <X color={colors.gray[400]} />
              </View>
            </TouchableOpacity>
          </HStack>
          {children}
        </View>
      </BottomSheetComponent>
    </Portal>
  );
}
