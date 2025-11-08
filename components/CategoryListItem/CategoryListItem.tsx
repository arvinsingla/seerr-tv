import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TMDB_IMAGE_URL, TMDB_LOGO_IMAGE_URL_FILTER } from '@/lib/constants'
import { Category } from '../HorizontalCategoryList/HorizontalCategoryList'
import { normalizeSize } from '@/lib/utils'

interface CategoryListItemProps {
  category: Category,
  isLogo?: boolean,
  onPress: (category: Category) => void
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({ category, onPress, isLogo = false }) => {
  const { name, backdrops } = category
  const randomIndex = Math.floor(Math.random() * backdrops.length);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress(category)}
      style={styles.container}
      tvParallaxProperties={{
        enabled: true,
        magnification: 1.1,
        tiltAngle: 0
      }}
    >
      {isLogo &&
        <Image
          source={{ uri: `${TMDB_LOGO_IMAGE_URL_FILTER}${backdrops[randomIndex]}` }}
          resizeMode="contain"
          style={[
            styles.logo,
          ]} />
      }
      {!isLogo &&
        <Image
          source={{ uri: `${TMDB_IMAGE_URL}${backdrops[randomIndex]}` }}
          style={[
            styles.poster,
          ]} />
      }
      {name ? <Text style={styles.nameText}>{name}</Text> : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: normalizeSize(15),
    backgroundColor: "#000000",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: normalizeSize(400),
    height: normalizeSize(225),
  },
  poster: {
    position: 'absolute',
    width: normalizeSize(400),
    height: normalizeSize(225),
    borderRadius: normalizeSize(15),
    opacity: 0.5,
  },
  logo: {
    position: 'absolute',
    width: normalizeSize(250),
    height: normalizeSize(150),
    borderRadius: normalizeSize(15),
    opacity: 0.9,
  },
  nameText: {
    color: '#ffffff',
    fontSize: normalizeSize(40),
    fontWeight: 'bold',
  }
})

export default CategoryListItem
