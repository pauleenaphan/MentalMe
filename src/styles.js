import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
//#B6D3B3: used for background color of the pages (primary)
//black: used for text (secondary)
//#568258: used for button colors1 (Accent)
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
    borderRadius: 10,
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
    backgroundColor: '#B6D3B3',
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
});

export const userTaskPopup = StyleSheet.create({
  xBtn:{
    textAlign: 'right', 
    fontSize: 40, 
    fontWeight: 'bold', 
    marginTop: -10
  },
  title:{
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 30
  },
  caption:{
    textAlign: 'center', 
    marginBottom: 20
  },
  honeyCoin:{
    width: 50, 
    height: 50, 
    marginTop: -10
  },
  //container for task name and task status
  taskContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: -5
  },
  taskName:{
    fontSize: 25, 
  },
  taskCaption:{
    marginBottom: 15
  },
  taskStatus:{
    width: 40, 
    height: 40, 
    marginLeft: 10
  },
  loginCoinValue:{
    fontSize: 20, 
    marginLeft: 53, 
    marginRight: -10
  },
  journalCoinValue:{
    fontSize: 20, 
    marginLeft: 30, 
    marginRight: -10
  },
  weeklyCoinValue:{
    fontSize: 20, 
    marginLeft: 25, 
    marginRight: -10
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
  },
  headerTitle:{
    fontWeight: 'bold', 
    fontSize: 35
  },
  moobieContainer:{
    height: 500, 
    marginTop: 10
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
    height: 170, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10
  },
  //container for the clothes and text
  clothesContainer:{
    borderRadius: 10, 
    marginTop: 30, 
    marginLeft: 10, 
    marginRight: 10, 
    marginBottom: 20, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#B6D3B3', 
  },
  //container for closet display
  closetContainer:{
    flexDirection: 'row', 
    backgroundColor:'#86AB86',
    alignItems: 'flex-end', 
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
  //for title and caption
  headerContainer:{
    flexDirection: 'row', 
    alignContent: 'center', 
    justifyContent: "space-around"
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
  entryTitle:{
    fontSize: 20,
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
    marginLeft: '25%', 
    width: '50%',
    marginBottom: 20
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
    marginTop: 40, 
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
    height: '100%',
    backgroundColor: '#B6D3B3'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption:{
    textAlign: 'center', 
    marginBottom: 20
  },
  checkboxContainer:{
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 40,
    marginRight: 5,
    marginLeft: 5,
  },
  checkboxLabel:{
    marginTop: 5,
    width: 40,
    height: 40,
    textAlign: 'center',
  },
  weeklyCheckbox:{
    width: 40,
    height: 40,
    contentFit: 'contain',
  },
  rowOfCheckboxes:{
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 30,
  },
  statContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel:{
    width: 100,
    fontSize: 13,
    textAlign: 'center',
  },
  statNumber:{
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#81A282',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft:50,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#81A282',
    overflow: 'hidden',
  },
  moobieImg:{
    width: '100%', 
    height: '100%', 
    bottom: '15%'
  }
})

export const storePage = StyleSheet.create({
  pageContainer:{
    flex: 1, 
    backgroundColor: "#B6D3B3"
  },
  //container for the honeycoin amt and description
  headingContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: -15
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
  storeItemContainer:{
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    width: '100%', 
    justifyContent: 'center'
  },
  //container for the boxes with the item price, name, and img
  itemDisplayContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    width: '45%', 
    backgroundColor: '#86AB86',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
    borderRadius: 10,
    margin: 10
  },
  itemImgHead:{
    width: 150, 
    height: 150, 
    marginTop: -5, 
    marginBottom: -25,
  },
  itemImgBody:{
    width: 150, 
    height: 150, 
    marginTop: -30
  },
  itemImgLowerFeet:{
    width: 150, 
    height: 150, 
    marginTop: -50
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
    margin: 10,
  },
  itemTitle:{
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'black', 
    marginTop: -20
  },
  priceContainer:{
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-end'
  },
  price:{
    fontSize: 20, 
    marginRight: 5,
    color: 'black'
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

export const storePurchasedPopup = StyleSheet.create({
  modal:{
    justifyContent: 'flex-end', 
    alignItems: 'flex-start' 
  },
  container:{
    backgroundColor: "#B6D3B3", 
    height: 150, 
    width: 180, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    padding: 25
  },
  title:{
    fontSize: 25, 
    fontWeight: 'bold', 
    marginBottom: -35, 
    paddingTop: 20,
  },
  itemImg:{
    height: 100, 
    width: 100
  },
  bodyItemName:{
    marginBottom: -30
  },
  lowerItemName:{
    marginBottom: -40
  }
})

//style for the settings page
export const settingsPage = StyleSheet.create({
  pageContainer:{
    flex: 1, 
    alignItems: 'center',
    backgroundColor: '#B6D3B3'
  },
  //container for the whole page excluding the back button
  pageTitle:{
    fontSize: 35, 
    fontWeight: 'bold', 
    marginBottom: 50, 
    textAlign: 'center'
  },
  headerTitle:{
    fontWeight: 'bold', 
    fontSize: 23
  },
  logOutBtn:{
    backgroundColor: '#568258', 
    borderRadius: 10, 
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingLeft: 20,
    paddingRight: 20,
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

export const notifStyle = StyleSheet.create({
  mainText:{
    textAlign: 'center'
  }
})