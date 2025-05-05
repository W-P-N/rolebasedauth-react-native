import { Pressable, StyleSheet, Text } from "react-native";

function CustomButton({text, onPress}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed ? [styles.button, styles.pressed] : styles.button }>
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </Pressable>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.70
    },
    buttonText: {
        fontSize: 16,
    }
})


