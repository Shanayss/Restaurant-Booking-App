import { Image, type ImageStyle, type StyleProp } from 'react-native';

interface BrandLogoProps {
  style: StyleProp<ImageStyle>;
}

export default function BrandLogo({ style }: BrandLogoProps) {
  return (
    <Image
      source={require('../../assets/images/resto-name.png')}
      style={style}
      resizeMode="contain"
      accessibilityLabel="Resto Grill"
    />
  );
}
