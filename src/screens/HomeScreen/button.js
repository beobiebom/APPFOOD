import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

/**
 * define props => same Block
 *
 * TouchableOpacity is very cool
 */

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
});

const Button = ({
    block,
    margin,
    padding,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    borderRadius,
    color,
    fontSize,
    textColor,
    style,
    textStyle,
    centered,
    middle,
    children,
    shadow,
    onPress,
    ...props
}) => {
    const styleComponent = [
        block && styles.block,
        margin && { margin },
        padding && { padding },
        width && { width },
        height && { height },
        border && { borderWidth: 1, borderColor: 'gray' },
        borderWidth && { borderWidth },
        borderColor && { borderColor },
        borderRadius && { borderRadius },
        color && { backgroundColor: color },
        centered && { justifyContent: 'center' },
        middle && { alignItems: 'center' },
        shadow && {
            shadowOpacity: 0.14,
            shadowRadius: 4,
            shadowColor: '#000',
            shadowOffset: { height: 0, width: 0 },
        },
        style,
    ];
    const styleText = [
        fontSize && { fontSize },
        textColor && { color: textColor },
        textStyle,
    ];

    if (typeof children == 'string') {
        return (
            <TouchableOpacity style={styleComponent} onPress={onPress} {...props}>
                <Text style={styleText}>{children}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styleComponent} onPress={onPress}  {...props}>
            {children}
        </TouchableOpacity>
    );
};

export default Button;