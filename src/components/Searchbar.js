/* eslint-disable no-use-before-define */
import React from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import starWarsShips from "./StarWarsShips.js";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {},
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const searchbarRegex = string => {
  //tests search input against regex for common mispellings of X-Wing, Y-Wing, AT-AT, etc.
  let lowerCaseString = string != undefined ? string.toLowerCase() : "";
  let variable = lowerCaseString.substring(0, 1);
  let regexChecker = dynamicRegexCreator(lowerCaseString, variable);
  // const xwing = /^x.?w/; // function made to create dynamic regex based on searchbar input. I assume they got the
  // const ywing = /^y.?w/; // letter right for x, y, u, b, a wing, but misspelled it xwing, x=wing, x wing, etc.
  // const bwing = /^b.?w/;
  // const awing = /^a.?w/;
  // const uwing = /^u.?w/;
  const atst = /^at.?st/;
  const atat = /^at.?at/; //simplified version of below with string set to lowercase
  // const atat = /^[Aa][Tt].?[Aa][Tt]/ //matches misspellings of AT-AT. Capital or lowercase 'AT's, with any character or no character in between
  if (regexChecker.test(lowerCaseString)) {
    let substring = variable + "-wing";
    return substring;
  } else if (atst.test(lowerCaseString)) {
    return "at-st";
  } else if (atat.test(lowerCaseString)) {
    return "at-at";
  } else {
    return lowerCaseString;
  }
};

//makes regex for x, y, b, u, a-wing misspellings: xwing, x=wing, x wing, etc.
const dynamicRegexCreator = (lowerCaseString, variable) => {
  const regex = new RegExp("^" + variable + ".?w");
  return regex;
};

export default function SearchBox(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      onChange={(event, value) => {
        props.handleSearchbarData(searchbarRegex(value));
      }}
      options={starWarsShips.starWarsShips2.map(ship => ship.name)}
      renderInput={params => (
        <div>
          <TextField
            classes={{ root: classes.root }}
            style={{
              width: 300,
              position: "relative"
            }}
            {...params}
            placeholder="Search"
            margin="dense"
            variant="outlined"
          />
        </div>
      )}
    />
  );
}
// const starWarsHotWheels = [
//   [
//     "AT-AT Walker",
//     2017,
//     "https://i5.walmartimages.com/asr/3256e83b-b166-4e7c-aed7-be8be2132fbb_1.578ea2444babe7bdfeac9d3a152331c5.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
//     "FPL64",
//     "Single"
//   ],
//   [
//     "Obi-Wan Kenobi's Jedi Starfighter",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/71Cueb-pu6L._AC_SY450_.jpg",
//     "CGW65",
//     "Single"
//   ],
//   [
//     "Boba Fett's Slave I",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/81ZBEb-ptsL._AC_SY606_.jpg",
//     "CKJ63",
//     "Single"
//   ],
//   [
//     "Darth Vader's TIE Advanced",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/81A8MCd7YlL._AC_SX425_.jpg",
//     "CGW69",
//     "Single"
//   ],
//   [
//     "Vulture Droid",
//     2015,
//     "https://media.mattel.com/root/Images/MainImage/cgw71_hot_wheels_star_wars_starship_vulture_droid_hot_wheels_star_wars_starship_vulture_droid_xxx.jpg",
//     "CGW71",
//     "Single"
//   ],
//   [
//     "Ghost",
//     2015,
//     "https://cdn10.bigcommerce.com/s-r8yraidg/products/9900/images/9430/ghost__57736.1430445600.1280.1280.jpg?c=2",
//     "CGW62",
//     "Single"
//   ],
//   [
//     "Millenium Falcon",
//     2015,
//     "https://wwwassets.pricespider.com/product_static/450/9438/9438871.png",
//     "CGW56",
//     "Single"
//   ],
//   [
//     "Naboo Starfighter",
//     2015,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=CGW70",
//     "CGW70",
//     "Single"
//   ],
//   [
//     "Republic Attack Gunship",
//     2015,
//     "https://m.media-amazon.com/images/I/81cFbVHMHGL.jpg",
//     "CGW58",
//     "Single"
//   ],
//   [
//     "Rebel Snowspeeder",
//     2015,
//     "https://cdn10.bigcommerce.com/s-r8yraidg/products/9901/images/9431/snowspeeder__50670.1430445773.1280.1280.jpg?c=2",
//     "CGW63",
//     "Single"
//   ],
//   [
//     "Star Destroyer",
//     2015,
//     "https://static.wikia.nocookie.net/hotwheels/images/4/4b/Star_Destroyer_%28CGW57%29_01.jpg/revision/latest/scale-to-width-down/340?cb=20171206012121",
//     "CGW57",
//     "Single"
//   ],
//   [
//     "TIE Fighter",
//     2015,
//     "https://m.media-amazon.com/images/I/81zRvVnwgZL.jpg",
//     "CGW53",
//     "Single"
//   ],
//   [
//     "X-Wing Starfighter",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/41paoWmpNgL._AC_SY400_.jpg",
//     "CKR61",
//     "Single"
//   ],
//   [
//     "Y-Wing Starfighter",
//     2015,
//     "https://static.wikia.nocookie.net/hotwheels/images/4/40/Y-Wing_Starfighter.jpg/revision/latest?cb=20150627084020",
//     "CGW59",
//     "Single"
//   ],
//   [
//     "Phantom",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/71UI1YgXCwL._AC_SL1486_.jpg",
//     "CKJ65",
//     "Single"
//   ],
//   [
//     "Millenium Falcon",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/51fwRo9PH9L._AC_SY400_.jpg",
//     "CKJ66",
//     "Single"
//   ],
//   [
//     "Poe's X-Wing Fighter",
//     2015,
//     "https://i.ebayimg.com/images/g/nfQAAOSwTZpeTPC6/s-l640.jpg",
//     "DJJ63",
//     "Single"
//   ],
//   [
//     "Kylo Ren's Command Shuttle",
//     2015,
//     "https://wwwassets.pricespider.com/product_static/450/9595/9595073.png",
//     "CKJ68",
//     "Single"
//   ],
//   [
//     "First Order Special Forces TIE Fighter",
//     2015,
//     "https://media.mattel.com/root/Images/MainImage/ckj67_r.jpg",
//     "CKJ67",
//     "Single"
//   ],
//   [
//     "First Order TIE Fighter",
//     2015,
//     "https://images-na.ssl-images-amazon.com/images/I/519zSc8iR4L._AC_SY400_.jpg",
//     "DJJ61",
//     "Single"
//   ],
//   [
//     "Resistance X-Wing Fighter",
//     2015,
//     "https://media.mattel.com/root/Images/MainImage/ckj71_r.jpg",
//     "CKJ71",
//     "Single"
//   ],
//   [
//     "Mon Calamari Cruiser vs Star Destroyer",
//     2015,
//     "https://i.ebayimg.com/images/g/2dEAAOSw-CpX~81Z/s-l600.jpg",
//     "CGW93",
//     "2-Pack"
//   ],
//   [
//     "Resistance X-Wing Fighter vs First Order Transporter",
//     2015,
//     "https://m.media-amazon.com/images/I/81NMUlHmTYL.jpg",
//     "CKJ81",
//     "2-Pack"
//   ],
//   [
//     "Rey's Speeder",
//     2016,
//     "https://m.media-amazon.com/images/I/71o3OoascwL.jpg",
//     "CKJ69",
//     "Single"
//   ],
//   [
//     "First Order Snowspeeder",
//     2016,
//     "https://images-na.ssl-images-amazon.com/images/I/71FHI9f6z1L._AC_SL1500_.jpg",
//     "CKJ70",
//     "Single"
//   ],
//   [
//     "First Order Star Destroyer",
//     2016,
//     "https://images.mattel.com/scene7//wcsstore/MattelCAS/CKJ72_Viewer?storeId=10151&SKU=CKJ72",
//     "CKJ72",
//     "Single"
//   ],
//   [
//     "Jabba's Sail Barge",
//     2016,
//     "https://images-na.ssl-images-amazon.com/images/I/71AmhNxo6hL._AC_SL1500_.jpg",
//     "CGW60",
//     "Single"
//   ],
//   [
//     "Yoda's Jedi Starfighter",
//     2016,
//     "https://images.mattel.com/scene7/DNP18_01?$oslarge$&wid=412&hei=412&wid=1600&hei=1600",
//     "DNP18",
//     "Single"
//   ],
//   [
//     "Sith Infiltrator",
//     2016,
//     "https://i5.walmartimages.com/asr/619b57b3-d16d-4325-afea-55df179a7021_1.1776049a29223b536a49f89805356d75.jpeg",
//     "CGW72",
//     "Single"
//   ],
//   [
//     "Tantive IV",
//     2016,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=CGW61",
//     "CGW61",
//     "Single"
//   ],
//   [
//     "Republic Gunship Tiger Shark",
//     2016,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=DMP61",
//     "DMP61",
//     "Single"
//   ],
//   [
//     "Imperial Shuttle",
//     2016,
//     "https://images-na.ssl-images-amazon.com/images/I/71YfkGawszL._AC_SY741_.jpg",
//     "DMP62",
//     "Single"
//   ],
//   [
//     "Inquisitor's TIE Fighter",
//     2016,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=DMP64",
//     "DMP64",
//     "Single"
//   ],
//   [
//     "ARC-170 Starfighter",
//     2016,
//     "https://static.wikia.nocookie.net/hotwheels/images/b/bd/Arc-170_Starfighter_%28DMP65%29_01.jpg/revision/latest?cb=20171001004433",
//     "DMP65",
//     "Single"
//   ],
//   [
//     "AT-AT vs Rebel Snowspeeder",
//     2016,
//     "https://images-na.ssl-images-amazon.com/images/I/61nnhfg97NL._AC_UL474_SR474,450_.jpg",
//     "DML94",
//     "Single"
//   ],
//   [
//     "Jango Fett's Slave I vs Obi-Wan Kenobi's Jedi Starfighter",
//     2016,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=CGW92",
//     "CGW92",
//     "2-Pack"
//   ],
//   [
//     "Speeder Bike",
//     2017,
//     "https://static.wikia.nocookie.net/hotwheels/images/d/d4/Speeder_Bike_%28DMP66%29_01.jpeg/revision/latest/scale-to-width-down/340?cb=20180319001739",
//     "DMP66",
//     "Single"
//   ],
//   [
//     "Poe's Ski Speeder",
//     2017,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=FJD65",
//     "FJD65",
//     "Single"
//   ],
//   [
//     "Millenium Falcon",
//     2017,
//     "https://static.wikia.nocookie.net/hotwheels/images/d/de/Millenium_Falcon.jpg/revision/latest?cb=20150627083911",
//     "DXX45",
//     "Single"
//   ],
//   [
//     "Poe's X-Wing Fighter",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/81qrAzzeSGL._AC_SY450_.jpg",
//     "DXX46",
//     "Single"
//   ],
//   [
//     "Resistance X-Wing Fighter",
//     2017,
//     "https://m.media-amazon.com/images/I/815UUIPm5yL.jpg",
//     "DXX47",
//     "Single"
//   ],
//   [
//     "First Order Special Forces TIE Fighter",
//     2017,
//     "https://i5.walmartimages.ca/images/Enlarge/833/087/6000196833087.jpg",
//     "DXX49",
//     "Single"
//   ],
//   [
//     "The Ghost",
//     2017,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=DXX51",
//     "DXX51",
//     "Single"
//   ],
//   [
//     "Tantive IV",
//     2017,
//     "https://static.wikia.nocookie.net/hotwheels/images/9/90/Tantive_IV_%28CGW61%29_01.jpg/revision/latest/scale-to-width-down/340?cb=20171015013320",
//     "DXX52",
//     "Single"
//   ],
//   [
//     "X-Wing Fighter (Red Five)",
//     2017,
//     "https://i5.walmartimages.com/asr/9b0b8af5-4e60-4248-be62-f5137b63b74a_1.ed6a8a36f1e4bbd49f356825eed5f39e.jpeg",
//     "DXX53",
//     "Single"
//   ],
//   [
//     "TIE Fighter",
//     2017,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=DXX55",
//     "DXX55",
//     "Single"
//   ],
//   [
//     "Star Destroyer",
//     2017,
//     "https://static.wikia.nocookie.net/hotwheels/images/a/a1/Star_Destroyer_%28DXX57%29_01.jpeg/revision/latest/scale-to-width-down/340?cb=20171206012224",
//     "DXX57",
//     "Single"
//   ],
//   [
//     "Imperial Shuttle (Rogue One)",
//     2017,
//     "https://i.ebayimg.com/images/g/FYcAAOSw6sZeT3Q1/s-l640.jpg",
//     "DXX59",
//     "Single"
//   ],
//   [
//     "Rey's Speeder",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/71LTsTbJ6DL._AC_SY879_.jpg",
//     "DXX60",
//     "Single"
//   ],
//   [
//     "The Phantom",
//     2017,
//     "https://i.ebayimg.com/images/g/LMwAAOSw7RteTixU/s-l640.jpg",
//     "DXX63",
//     "Single"
//   ],
//   [
//     "AT-ST (Rogue One)",
//     2017,
//     "https://i5.walmartimages.com/asr/d5ba5080-183a-4e68-8047-b743a72a7ecf_1.e99bb9dfc6a285f92a812475c5dcd213.jpeg",
//     "DXD99",
//     "Single"
//   ],
//   [
//     "Tie Striker",
//     2017,
//     "https://i.ebayimg.com/images/g/qsMAAOSwyuZdKaTy/s-l500.jpg",
//     "DXD98",
//     "Single"
//   ],
//   [
//     "Partisan X-Wing Fighter",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/413guIDivAL._AC_SY400_.jpg",
//     "DYK03",
//     "Single"
//   ],
//   [
//     "A-Wing Fighter",
//     2017,
//     "https://m.media-amazon.com/images/I/71O9lgReafL.jpg",
//     "DNP19",
//     "Single"
//   ],
//   [
//     "Imperial Cargo Shuttle",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/81Zbt4VlUuL._AC_SL1500_.jpg",
//     "DXF00",
//     "Single"
//   ],
//   [
//     "Kylo Ren's TIE Silencer",
//     2017,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=FBB04",
//     "FBB04",
//     "Single"
//   ],
//   [
//     "First Order Heavy Assault Walker",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/71KWrzmLyHL._AC_SX355_.jpg",
//     "FBB05",
//     "Single"
//   ],
//   [
//     "A-Wing Fighter",
//     2017,
//     "https://static.wikia.nocookie.net/hotwheels/images/3/31/Resistance_A-wing_Fighter_%28FBB07%29_01.jpg/revision/latest/scale-to-width-down/340?cb=20171015014148",
//     "FBB07",
//     "Single"
//   ],
//   [
//     "First Order Star Destroyer",
//     2017,
//     "https://i5.walmartimages.com/asr/81a8de5f-2b7c-40b9-82cd-6cbfc7a8ca25_1.79c8883d86fae1f25e70c118e6bb1457.jpeg",
//     "FBB30",
//     "Single"
//   ],
//   [
//     "Y-Wing Fighter",
//     2017,
//     "https://static.wikia.nocookie.net/hotwheels/images/4/40/Y-Wing_Starfighter.jpg/revision/latest?cb=20150627084020",
//     "FBB39",
//     "Single"
//   ],
//   [
//     "Darth Vader's TIE Fighter",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/91m4FUEmORL._SL1500_.jpg",
//     "FBB43",
//     "Single"
//   ],
//   [
//     "Resistance Bomber",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/71iOL8lRUlL._AC_SX466_.jpg",
//     "FJD64",
//     "Single"
//   ],
//   [
//     "Imperial AT-ACT Cargo Walker",
//     2017,
//     "https://m.media-amazon.com/images/I/717KKa88XVL.jpg",
//     "DXD97",
//     "Single"
//   ],
//   [
//     "Kylo Ren's Command Shuttle",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/81SzD2PZHcL._AC_UL600_SR444,600_.jpg",
//     "FGR18",
//     "Single"
//   ],
//   [
//     "Mandalorian Talon Fighter",
//     2017,
//     "https://i5.walmartimages.com/asr/5a207f19-0cfb-4fea-b876-ba4afced90a0_1.b184f2476b700a91c647728e792b92fd.jpeg",
//     "DMP60",
//     "Single"
//   ],
//   [
//     "Rebel U-Wing Fighter",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/71hRMYoVnnL._AC_UL600_SR600,600_.jpg",
//     "DMP67",
//     "Single"
//   ],
//   [
//     "Imperial Combat Assault Hovertank",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/81w5CAv9p0L._AC_SX425_.jpg",
//     "FJF20",
//     "Single"
//   ],
//   [
//     "Star Destroyer",
//     2017,
//     "https://m.media-amazon.com/images/I/71PAzvN2V2L.jpg",
//     "FND10",
//     "Single",
//     "40th Anniversary"
//   ],
//   [
//     "Rebel Snowspeeder",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/81QSeUHk%2B3L._AC_SX569_.jpg",
//     "FPL65",
//     "Single"
//   ],
//   [
//     "AT-AT vs Rebel Snowspeeder",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/71abeDNV25L._AC_SX425_.jpg",
//     "DYH43",
//     "2-Pack"
//   ],
//   [
//     "TIE Fighter vs Red Five X-Wing Fighter",
//     2017,
//     "https://images.mattel.com/scene7/?$ossmallindex$&storeId=10151&SKU=DYH44",
//     "DYH44",
//     "2-Pack"
//   ],
//   [
//     "TIE Striker vs Red Five X-Wing Fighter",
//     2017,
//     "https://images-na.ssl-images-amazon.com/images/I/41seIqFZlTL._AC_SY400_.jpg",
//     "DXM38",
//     "2-Pack"
//   ],
//   [
//     "TIE Interceptor vs Millenium Falcon",
//     2017,
//     "https://images.mattel.com/scene7/DML96_01?$oslarge$&wid=412&hei=412&wid=1600&hei=1600",
//     "DML96",
//     "2-Pack"
//   ],
//   [
//     "AAT Battle Tank",
//     2018,
//     "https://i.ebayimg.com/images/g/RIMAAOSwfZxeTKht/s-l640.jpg",
//     "FBX10",
//     "Single"
//   ],
//   [
//     "Republic Attack Cruiser",
//     2018,
//     "https://images-na.ssl-images-amazon.com/images/I/81Id%2BovS2cL._AC_SY355_.jpg",
//     "FBX12",
//     "Single"
//   ],
//   [
//     "Kessel Run Millenium Falcon",
//     2018,
//     "https://images.mattel.com/scene7//wcsstore/MattelCAS/FJF23_01?storeId=10151&SKU=FJF23",
//     "FJF23",
//     "Single"
//   ],
//   [
//     "Han Solo's Speeder",
//     2018,
//     "https://m.media-amazon.com/images/I/81k9v4Q4e2L.jpg",
//     "FJF24",
//     "Single"
//   ],
//   [
//     "Imperial Arrestor Cruiser",
//     2018,
//     "https://images.mattel.com/scene7/FJF25_01?$oslarge$&wid=549&hei=549",
//     "FJF25",
//     "Single"
//   ],
//   [
//     "Imperial AT-Hauler",
//     2018,
//     "https://images.bonanzastatic.com/afu/images/b6fb/ac3a/5b94_5975015127/2018_mattel_hot_wheels_star_wars_starships_solo_imperial_at_hauler_C.jpg",
//     "FJF27",
//     "Single"
//   ],
//   [
//     "B-Wing Fighter",
//     2018,
//     "https://i5.walmartimages.com/asr/5ab4011e-bc29-4ca8-8fb6-1061af7ff6a2_1.3ccc2694dadf2574cac4f040bd73f47e.jpeg",
//     "FJD40",
//     "Single"
//   ],
//   [
//     "Landspeeder",
//     2018,
//     "https://static.wikia.nocookie.net/hotwheels/images/0/0c/Concept_Landspeeder_%28FJF22%29_02.jpg/revision/latest/scale-to-width-down/340?cb=20200426192431",
//     "FJF22",
//     "Single",
//     "Concept"
//   ],
//   [
//     "Millenium Falcon",
//     2018,
//     "https://i5.walmartimages.com/asr/fd7668d2-d4ee-4bbf-8439-780d642fe50d_1.18c5ae5992a00ea6f8c22cd5f2a2c637.jpeg",
//     "FJD63",
//     "Single",
//     "Concept"
//   ],
//   [
//     "Star Destroyer",
//     2018,
//     "https://images-na.ssl-images-amazon.com/images/I/71XwzEfX6JL._AC_SL1500_.jpg",
//     "FJF21",
//     "Single",
//     "Concept"
//   ],
//   [
//     "TIE Fighter",
//     2018,
//     "https://images-na.ssl-images-amazon.com/images/I/81MdMOhiPmL._AC_SY606_.jpg",
//     "FBB10",
//     "Single",
//     "Concept"
//   ],
//   [
//     "X-Wing Fighter",
//     2018,
//     "https://images-na.ssl-images-amazon.com/images/I/712WgUE5l%2BL._AC_SL1500_.jpg",
//     "FBB06",
//     "Single",
//     "Concept"
//   ],
//   [
//     "General Grievous Wheel Bike",
//     2018,
//     "https://images-na.ssl-images-amazon.com/images/I/81gkBJ7cfnL._AC_SY550_.jpg",
//     "FCC22",
//     "Single",
//     "Limited"
//   ],
//   [
//     "TIE Bomber",
//     2018,
//     "https://s3-us-west-2.amazonaws.com/images.collecthw.com/59ed8fd1-4796-456b-93fc-a19564cc5464_large.png",
//     "FJD61",
//     "Single",
//     "Limited"
//   ],
//   [
//     "Sandcrawler",
//     2018,
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFqQgmWesIfow8o9UvTyhMEMeiuOHlwfXa4g&usqp=CAU",
//     "FJF19",
//     "Single",
//     "Limited"
//   ]
// ];
//
// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   { title: "The Lord of the Rings: The Return of the King", year: 2003 },
//   { title: "The Good, the Bad and the Ugly", year: 1966 },
//   { title: "Fight Club", year: 1999 },
//   { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
//   { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
//   { title: "Forrest Gump", year: 1994 },
//   { title: "Inception", year: 2010 },
//   { title: "The Lord of the Rings: The Two Towers", year: 2002 },
//   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { title: "Goodfellas", year: 1990 },
//   { title: "The Matrix", year: 1999 },
//   { title: "Seven Samurai", year: 1954 },
//   { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
//   { title: "City of God", year: 2002 },
//   { title: "Se7en", year: 1995 },
//   { title: "The Silence of the Lambs", year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: "Life Is Beautiful", year: 1997 },
//   { title: "The Usual Suspects", year: 1995 },
//   { title: "Léon: The Professional", year: 1994 },
//   { title: "Spirited Away", year: 2001 },
//   { title: "Saving Private Ryan", year: 1998 },
//   { title: "Once Upon a Time in the West", year: 1968 },
//   { title: "American History X", year: 1998 },
//   { title: "Interstellar", year: 2014 },
//   { title: "Casablanca", year: 1942 },
//   { title: "City Lights", year: 1931 },
//   { title: "Psycho", year: 1960 },
//   { title: "The Green Mile", year: 1999 },
//   { title: "The Intouchables", year: 2011 },
//   { title: "Modern Times", year: 1936 },
//   { title: "Raiders of the Lost Ark", year: 1981 },
//   { title: "Rear Window", year: 1954 },
//   { title: "The Pianist", year: 2002 },
//   { title: "The Departed", year: 2006 },
//   { title: "Terminator 2: Judgment Day", year: 1991 },
//   { title: "Back to the Future", year: 1985 },
//   { title: "Whiplash", year: 2014 },
//   { title: "Gladiator", year: 2000 },
//   { title: "Memento", year: 2000 },
//   { title: "The Prestige", year: 2006 },
//   { title: "The Lion King", year: 1994 },
//   { title: "Apocalypse Now", year: 1979 },
//   { title: "Alien", year: 1979 },
//   { title: "Sunset Boulevard", year: 1950 },
//   {
//     title:
//       "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//     year: 1964
//   },
//   { title: "The Great Dictator", year: 1940 },
//   { title: "Cinema Paradiso", year: 1988 },
//   { title: "The Lives of Others", year: 2006 },
//   { title: "Grave of the Fireflies", year: 1988 },
//   { title: "Paths of Glory", year: 1957 },
//   { title: "Django Unchained", year: 2012 },
//   { title: "The Shining", year: 1980 },
//   { title: "WALL·E", year: 2008 },
//   { title: "American Beauty", year: 1999 },
//   { title: "The Dark Knight Rises", year: 2012 },
//   { title: "Princess Mononoke", year: 1997 },
//   { title: "Aliens", year: 1986 },
//   { title: "Oldboy", year: 2003 },
//   { title: "Once Upon a Time in America", year: 1984 },
//   { title: "Witness for the Prosecution", year: 1957 },
//   { title: "Das Boot", year: 1981 },
//   { title: "Citizen Kane", year: 1941 },
//   { title: "North by Northwest", year: 1959 },
//   { title: "Vertigo", year: 1958 },
//   { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
//   { title: "Reservoir Dogs", year: 1992 },
//   { title: "Braveheart", year: 1995 },
//   { title: "M", year: 1931 },
//   { title: "Requiem for a Dream", year: 2000 },
//   { title: "Amélie", year: 2001 },
//   { title: "A Clockwork Orange", year: 1971 },
//   { title: "Like Stars on Earth", year: 2007 },
//   { title: "Taxi Driver", year: 1976 },
//   { title: "Lawrence of Arabia", year: 1962 },
//   { title: "Double Indemnity", year: 1944 },
//   { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
//   { title: "Amadeus", year: 1984 },
//   { title: "To Kill a Mockingbird", year: 1962 },
//   { title: "Toy Story 3", year: 2010 },
//   { title: "Logan", year: 2017 },
//   { title: "Full Metal Jacket", year: 1987 },
//   { title: "Dangal", year: 2016 },
//   { title: "The Sting", year: 1973 },
//   { title: "2001: A Space Odyssey", year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: "Toy Story", year: 1995 },
//   { title: "Bicycle Thieves", year: 1948 },
//   { title: "The Kid", year: 1921 },
//   { title: "Inglourious Basterds", year: 2009 },
//   { title: "Snatch", year: 2000 },
//   { title: "3 Idiots", year: 2009 },
//   { title: "Monty Python and the Holy Grail", year: 1975 }
// ];
