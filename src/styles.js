import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
//#B6D3B3: used for background color of the pages
//#568258: used for button colors
//#81A282: used for journal entry 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

//style for loginpage
export const loginPage = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B6D3B3',
  },
  textInputContainer:{
    alignItems: 'flex-start',
    marginBottom: 30,
    padding: 20,
  },
  textInputLogin:{
    fontSize: 20,
    borderBottomWidth: 1,
    width: 250,
  },
  textInputCreate:{
    fontSize: 20,
    borderBottomWidth: 1,
    width: 250,
  },
  textContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    margin: 10,
  },
  title:{
    fontSize: 30,
    bottom: 15,
    backgroundColor: '#B6D3B3',
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: '#568258',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  icon:{
    marginLeft: -30,
    marginBottom: 10
  }
  
})

//style for homepage
export const homePage = StyleSheet.create({
  iconBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconBar:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#568258',
    width: "100%",
    padding: 20,
    height: 80,
  },
  currency:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 70,
    left: 0,
    top: 0
  },
  background:{
    flex: 1,
    width: '100%',
    height: '110%',
  }
})

//style for honey coins
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
    top: 220,
    left: -25,
  },
  moobie_body:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 265,
    right: -40,
  },
  moobie_feet:{
    position: 'absolute',
    width: 400,
    height: 400,
    bottom: 129,
    right: 22,
  }
})

//style for the closet page
export const closetPage = StyleSheet.create({
  //style for moobie's model
  pageContainer:{
    flex: 1, 
    backgroundColor: '#B6D3B3'
  },
  //for the header and caption
  headerContainer:{
    justifyContent: 'center', 
    alignItems: 'center', 
    top: 80
  },
  headerTitle:{
    fontWeight: 'bold', 
    fontSize: 35
  },
  moobieContainer:{
    height: 500, 
    marginTop: 70
  },
  moobieHead:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: -10,
    left: -25
  },
  moobieBody:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 38,
    right: -40
  },
  moobieFeet:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: 141,
    right: 25,
  },
  //style for the imgs of the clothes
  clothesImg:{
    width: 200, 
    height: 180, 
    backgroundColor:'#DBE9D9', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10
  },
  //container for the clothes and text
  clothesContainer:{
    backgroundColor: '#568258', 
    borderRadius: 10, 
    marginTop: 30, 
    marginLeft: 10, 
    marginRight: 10, 
    marginBottom: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  //container for closet display
  closetContainer:{
    flexDirection: 'row', 
    backgroundColor: '#81A282', 
    alignItems: 'flex-end', 
    borderTopWidth: 5, 
    borderTopColor: '#568258'
  }
})

//style for journal page
export const journalPage = StyleSheet.create({
  //container for the journal entry title and caption
  homePage:{
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  //container for the whole page excluding the back button
  homePageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 40
  },
  //container for the whole page
  fullPageContainer:{
    flex: 1,
    backgroundColor: '#B6D3B3',
  },
  //for the title Journal Entries
  title:{
    fontSize: 40, 
    fontWeight: 'bold'
  },
  //each entry that is being displayed
  entry:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86AB86',
    borderRadius: 10,
    width: 320,
    padding: 20,
    marginTop: 15,
  },
  entryDate:{
    fontSize: 20, 
    color: 'black'
  },
  addEntryBtnBoxContainer:{
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    width: '90%', 
    top: 630,
    position: 'absolute'
  },
  addEntryContainer:{
    marginTop: 20, 
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingLeft: 15, 
    paddingRight: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#568258', 
    borderRadius: 10,
  },
  addEntryText:{
    color: 'black', 
    fontSize: 15, 
    fontWeight: 'bold'
  }
})

export const entryPage = StyleSheet.create({
  pageContainer:{
    flex: 1,
    backgroundColor: '#B6D3B3',
  },
  headerContainer:{
    marginTop: 120, 
    marginLeft: 40, 
    marginRight: 40, 
    marginBottom: 50
  },
  //title of the entry
  title:{
    fontSize: 30, 
    fontWeight: 'bold', 
    maxWidth: '100%', 
    textAlign: 'left'
  },
  entryDate:{
    fontSize: 20, 
    textAlign: 'center', 
    top: 57, 
    marginLeft: '25%', 
    width: '50%'
  },
  //entry description
  description:{
    marginLeft: 40, 
    marginRight: 40, 
    fontSize: 20, 
    backgroundColor: '#81A282', 
    height: 500, 
    padding: 10,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: '#568258',
    overflow: 'hidden'
  }
})

export const newEntryPage = StyleSheet.create({
  pageContainer:{
    flex: 1,
    backgroundColor: '#B6D3B3',
  },
  titleDescContainer:{
    alignItems: 'center', 
    marginTop: 150, 
    marginLeft: 40, 
    marginRight: 40
  },
  title:{
    fontSize: 30, 
    width: '100%', 
    marginBottom: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    textAlign: 'center'
  },
  descriptionContainer:{
    height: 500, 
    width: '100%', 
    padding: 20, 
    borderTopWidth: 1,
  },
  description:{
    flex: 1, 
    fontSize: 20
  }
})

export const progressPage = StyleSheet.create({
  fullPageContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B6D3B3'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  checkboxContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    marginRight: 10,
    marginLeft: 5,
    marginTop: 3
  },
  checkboxLabel:{
    marginTop: 5,
    width: 40,
    height: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  weeklyCheckbox:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  rowOfCheckboxes:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  statContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    marginRight: 50,
    marginLeft: 25,
    marginTop: 3
  },
  statBox:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'relative'
  },
  statLabel:{
    width: 115,
    height: 100,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  statNumber:{
    fontSize: 30,
    width: 110,
    height: 150,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -30,
    position: 'absolute'
  }
})

export const storePage = StyleSheet.create({
  pageContainer:{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: "#B6D3B3"
  },
  //container for the honeycoin amt and description
  headingContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 15,
  },
  headingContainer2:{
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  currencyContainer:{
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10
  },
  honeyCoinTitle:{
    fontSize: 20, 
    marginTop: 10, 
    fontWeight: 'bold'
  },
  honeyCoinTitleImg:{
    width: 40, 
    height: 40, 
    marginLeft: -10, 
    marginTop: 3
  },
  itemContainer:{
    flexDirection: 'row', 
    marginTop: 15, 
    marginLeft: 6, 
    marginRight: 8, 
    alignItems: 'center',
    borderWidth: 2, 
    borderRadius: 10
  },
  itemImgHead:{
    width: 150, 
    height: 150, 
    marginTop: 25, 
    marginBottom: -25
  },
  itemImgBody:{
    width: 150, 
    height: 150, 
    marginTop: -30
  },
  itemImgLowerFeet:{
    width: 150, 
    height: 150, 
    marginTop: -70
  },
  titlePriceContainer:{
    flexDirection: 'row',
    backgroundColor: '#DBE9D9', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '62%', height: '100%', 
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10, 
    borderLeftWidth: 2
  },
  titleOfItem:{
    margin: 10
  },
  priceContainer:{
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  price:{
    fontSize: 20
  },
  //img of honey coin nenxt to the price 
  priceCoin:{
    width: 50, 
    height: 50, 
    marginTop: -10, 
    marginLeft: -10
  },
})

//style for the storepop
export const storePopup = StyleSheet.create({
  popupContainer:{
    backgroundColor: '#8DB98B', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    maxHeight: '70%', 
    borderRadius: 10, 
    borderWidth: 5, 
    borderColor: 'white'
  },
  //container for price and img
  priceContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  priceTitle:{
    fontSize: 25
  },
  honeyCoinImg:{
    width: 60, 
    height: 60, 
    marginTop: -7, 
    marginLeft: -8
  },
  itemName:{
    fontSize: 35, 
    fontWeight: 'bold', 
    marginBottom: 10
  },
  headItemImg:{
    width: 300, 
    height: 300
  },
  bodyItemImg:{
    width: 300,
    height: 300,
    marginTop: -100,
    marginBottom: 60
  },
  lowerBodyItemImg:{
    width: 300,
    height: 300,
    marginTop: -120,
    marginBottom: 90
  },
  buyBtn:{
    backgroundColor: "#568258", 
    marginTop: -40,
    paddingLeft: 15, 
    paddingRight: 15, 
    borderRadius: 10
  }
})

//style for the settings page
export const settingsPage = StyleSheet.create({
  pageContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#B6D3B3'
  },
  //container for the whole page excluding the back button
  bodyContainer:{
    flex: 1, 
    marginTop: 100
  },
  settingsTitle:{
    fontSize: 40, 
    fontWeight: 'bold', 
    marginBottom: 50, 
    textAlign: 'center'
  },
  inAppTitle:{
    fontWeight: 'bold', 
    fontSize: 25
  },
  accountTitle:{
    fontWeight: 'bold', 
    fontSize: 25
  },
  logOutBtn:{
    backgroundColor: '#568258', 
    borderRadius: 10, 
    paddingTop: 10, 
    paddingBottom: 10, 
    marginTop: 10, 
    marginLeft: 30, 
    marginRight: 30
  },
  //container for the settings options under each header
  optionsContainer:{
    backgroundColor: '#81A282',  
    marginLeft: 10, 
    marginRight: 10, 
    marginTop: 10, 
    marginBottom: 50,
    width: 300, 
    borderRadius: 10, 
    alignItems: 'flex-start', 
    padding: 10
  },
})

//style for chat page
export const chatPage = StyleSheet.create({
  btnContainer:{
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  btn:{
    borderRadius: 8, 
    backgroundColor: '#568258', 
    marginRight: 5, 
    marginTop: 10
  },
  btnContainer:{
    flex: 1,
    width: '90%'
  },
  day:{
    color: '#404040', 
    fontSize: 15, 
    paddingTop: 20, 
    paddingBottom: 5
  },
  time:{
    color: '#404040', 
    paddingLeft: 10, 
    paddingRight: 20, 
    paddingBottom: 10, 
    fontSize: 12
  },
  userChatContainer:{
    flex: 1 , 
    backgroundColor: "#B6D3B3"
  }

})