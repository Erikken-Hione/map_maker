import React, {useState, useEffect} from 'react'
import useKeyPress from '../../Hooks/UseKeyPress/UseKeyPress.js'



const Maps = ({ tiles, tileset, size, activeTile, setTiles, zIndex, setzIndex, boolSwap }) => {
  
  const cloneMatrix = (m) => {
    const clone = new Array(m.length)
    for (let i=0; i < m.length; ++i ) {
      clone[i] = m[i].slice(0)
    }
    return clone;
  }

  const dropTile = ({x,y, tileset}) => {
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const update = {
        ...clone[y][x],
        v: activeTile,
        season_front: tileset,
      };
      clone[y][x] = update;
      console.log('clone', clone)
      return clone;
    });
  }


  const dropBackround = ({x, y, tileset}) => {
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const update = {
        ...clone[y][x],
        b: activeTile,
        season_back: tileset,
      };
      clone[y][x] = update;
      console.log("dropBack" ,clone)
      return clone
    })
  }

  useEffect(()=>{
    if(boolSwap) {
      setzIndex({front: 1, back: 2})
    } else {
      setzIndex({front: 2, back: 1})
    }
  }, [boolSwap])

    return (
    <div
      style = {{
        boxSizing: "border-box",
        backgroundColor: "white",
        width: size.width,
      }}
    > 
      <div style={{ position: "absolute", zIndex: 1 }}>
        {tiles.map((row, y) => (
          <div 
            style={{ display: "flex" }}>
              {row.map((tile, x) => (
                <div 
                  style = {{
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    background: "url(" + require(`../../../public/map-sprites/${tile.background_set}.png`) + ") " + `-${tile.background.x}px -${tile.background.y}px no-repeat`,
                    width: 32,
                    height: 32,
                  }}
                />
              ))}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", zIndex: zIndex.back }}>
        {tiles.map((row, y) => (
          <div 
            style={{ display: "flex" }}>
              {row.map((tile, x) => (
                <div className = "box back"
                  onClick={() => dropBackround({x,y,tileset})}
                  style = {{
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    background: "url(" + require(`../../../public/map-sprites/${tile.season_back}.png`) + ") " + `-${tile.b.x}px -${tile.b.y}px no-repeat`,
                    width: 32,
                    height: 32,
                  }}
                />
              ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", zIndex: zIndex.front }}>
        {tiles.map((row, y) => (
          <div 
            style={{ display: "flex" }}>
              {row.map((tile, x) => (
                <div className = "box front"
                  onClick={() => dropTile({x,y,tileset})}
                  style = {{
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    background: "url(" + require(`../../../public/map-sprites/${tile.season_front}.png`) + ") " + `-${tile.v.x}px -${tile.v.y}px no-repeat`,
                    width: 32,
                    height: 32,
                  }}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Maps;

