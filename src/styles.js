import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export const honeyCoin = StyleSheet.create({
  storePage:{
    width: 40,
    height: 40,
  }
});

//style for the moobie model
export const homePageMoobie = StyleSheet.create({
  moobie_head:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: 125,
    left: -25
  },
  moobie_body:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 172,
    right: -40
  },
  moobie_feet:{
    position: 'absolute',
    width: 400,
    height: 400,
    bottom: 129,
    right: 22
  }
})

//style for moobie in the closet
export const closetPageMoobie = StyleSheet.create({
  moobie_head:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: -10,
    left: -25
  },
  moobie_body:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 38,
    right: -40
  },
  moobie_feet:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: 141,
    right: 25
  }
})

//style for the clothe imgs
export const clothesImg = StyleSheet.create({
  store:{
    width: 200,
    height: 200
  },
  closet:{
    position: 'absolute',
    width: 200,
    height: 200
  }
})

export const closetContainer = StyleSheet.create({
  closet:{
    left: 120,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60
  },
})

