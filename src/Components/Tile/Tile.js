import React, {useState} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import cloneMatrix from '../Maps/Maps.js';

const Tile = ({tileset, position, activeTile, setActiveTile, setTileset, setBackgroundTile, setBoolSwap}) => {

	const tilesetData = require("../../Data/Tilesets.json")
	const tilesets = Object.keys(tilesetData).map((set) => ({
		type: "group",
		name: set.replace(/-/g, " "),
		items: tilesetData[set].variants.map(variant => ({
			value: `${variant}`,
			label: variant,
		}))
	}));

	const tilesetVariant = tileset
	const {width, height} = tilesetData["map-sprites"].size

	const tiles = []
	let id = 0
 	for(let y = 0; y < height; y = y + 32 ) {
 		const row = []
 		for(let x = 0; x < width; x = x + 32) {
 			row.push({
 				x, y, id: id++
 			})
 		}
 		tiles.push(row)
 	}

	return (
    <div 
	    id="palette"
	  	style={{
	      position: "absolute",
	      border: "1px solid black",
	      top: position.y,
	      left: position.x,
	      zIndex: 10,
	      backgroundColor: "white"
	    }}>
	  	<div style={{display: 'flex', marginBottom: 4, marginTop: 4}}>
		  	<img id="handle" src={require("../../img/drag-handle.png")} alt="handle" />
				<div style={{
					background: "url(" + require(`../../../public/map-sprites/${tileset}.png`) + ") " + `-${activeTile.x}px -${activeTile.y}px no-repeat`,
					width: 32,
					height: 32,
					border: "2px solid red"
					}}
				/>

				<div style={{ width: 200, marginLeft: 8}}>
					<Dropdown
						value={tileset}
						options={tilesets}
						onChange={(tileset) => setTileset(tileset.value)}
					/>
				</div>

				<div style={{marginLeft: 8}}>
					<button 
						onClick={() => setBackgroundTile(activeTile)} 
						style={{ padding: "6px 20px", fontSize: 14}}>FILL</button>
				</div>
				<div style={{marginLeft: 8}}>
					<button 
						onClick={() => setBoolSwap((prev) => !prev)} 
						style={{ padding: "6px 20px", fontSize: 14}}>SWAP</button>
				</div>

	  	</div>

  		<div style={{position: 'absolute', zIndex: 10, opacity: 0.55}}>
    		{
	      	tiles.map((row, y) => (
	      		<div style={{ display: "flex" }}>
	      			{row.map((tile, x) => 
	    					<div 
    						className='box'
		      				onClick = {() => setActiveTile({x: x*32, y: y*32})}
		      				style={{
			      				borderTop: "1px solid black",
			      				borderRight: "1px solid black",
			      				width: 32,
			      				height: 32
	      				}}/>
	      			)}
	      		</div>
	  			))
	      }
      </div>
  		<div >
    		{
	      	tiles.map((row, y) => (
	      		<div style={{ display: "flex" }}>
	      			{row.map((tile, x) => 
	    					<div 
		      				style={{
			      				borderTop: "1px solid black",
			      				borderRight: "1px solid black",
			      				background: 'url(' + require(`../../../public/map-sprites/${tileset}.png`) + ") " + `-${x*32}px -${y*32}px no-repeat`,
			      				width: 32,
			      				height: 32
	      				}}/>
	      			)}
	      		</div>
	  			))
	      }
      </div>
    </div>
	)
}

export default Tile;