import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import UserRegister from "./component/user";
import MarksRegister from "./component/marks";
import MarksFetch from "./component/showmarks";
import MarksBarGraph from "./component/barGraph";

const ResponsiveGridLayout = WidthProvider(Responsive);

const App = () => {
  const [Token, setToken] = useState("");
  const [layouts, setLayouts] = useState([
    { i: "a", x: 0, y: 0, w: 4, h: 3 },
    { i: "b", x: 4, y: 0, w: 8, h: 3 },
    { i: "c", x: 0, y: 1, w: 12, h: 2 },
  ]);

  const onLayoutChange = (newLayouts) => {
    setLayouts(newLayouts);
  };

  const onResize = (layout, oldLayout, newLayout) => {
    const targetComponent = newLayout.i;
    let totalWidth = 0;
  
    // Calculate the total width of all containers
    layouts.forEach(item => {
      totalWidth += item.w;
    });
  
    // Calculate the percentage of the total width occupied by the resized container
    const percentage = (newLayout.w / totalWidth) * 100;
  
    // Update the widths of all containers based on the calculated percentage
    const updatedLayouts = layouts.map(item => {
      if (item.i === targetComponent) {
        return newLayout;
      } else {
        return {
          ...item,
          w: item.w * (100 - percentage) / 100
        };
      }
    });
  
    setLayouts(updatedLayouts);
  };  
  

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen min-w-screen text-white relative">
      <div className="">
        <ResponsiveGridLayout
          compactType="vertical"
          autoSize
          isBounded
          isDraggable={false}
          isResizable={true}
          containerPadding={[20, 20]}
          layouts={{ lg: layouts }}
          onLayoutChange={onLayoutChange}
          onResize={onResize}
          breakpoints={{ lg: 1200 }}
          resizeHandles={["s", "w", "e", "n", "se", "sw", "ne", "nw"]}
        >
          {layouts.map((layout) => (
            <div
              key={layout.i}
              className="border-4 border-white"
              style={{ width: layout.w * 100, height: layout.h * 100 }}
            >
              {layout.i === "a" ? (
                <div className="p-4">
                  <div className="p-4">
                    {Token ? (
                      <MarksRegister
                        width={layout.w * 100}
                        height={layout.h * 100}
                      />
                    ) : (
                      <UserRegister
                        width={layout.w * 100}
                        height={layout.h * 100}
                      />
                    )}
                  </div>
                </div>
              ) : layout.i === "b" ? (
                <div className="p-4">
                  <div className="p-4">
                      <MarksBarGraph
                        width={layout.w * 100}
                        height={layout.h * 100}
                      />
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="p-4">
                    <MarksFetch />
                  </div>
                </div>
              )}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default App;
