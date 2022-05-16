import React, {FC, useEffect, useMemo, useState} from "react";
import {render} from "react-dom";
import {deg2rad, cast} from "./helpers";
import {room0} from "../data";
import {range} from "lodash";

const App: FC = () => {
    let [rover, setRover] = useState({x: 0, y: 0, t: 270});
    let [rays, setRays] = useState(
        range(rover.t - 15, rover.t + 15, .075).map(angle => ({
            a: {x: 60, y: 60},
            b: {x: Math.cos(deg2rad(angle)), y: Math.sin(deg2rad(angle))}
        }))
    );
    let walls = useMemo(
        () =>
            room0.map(([currX, currY], i) => {
                let [nextX, nextY] = room0[i + 1 === room0.length ? 0 : i + 1];
                return {a: {x: currX, y: currY}, b: {x: nextX, y: nextY}};
            }),
        []
    );

    let update = ({clientX: x, clientY: y}: MouseEvent) => {
        setRover({x, y});
        setRays(rays.map(({b}) => ({a: {x, y}, b})));
    };

    useEffect(() => {
        document.addEventListener("mousemove", update);
        return () => {
            document.removeEventListener("mousemove", update);
        };
    }, []);

    return (
        <svg style={{backgroundColor: "black"}} width={window.innerWidth} height={window.innerHeight}>
            {rays.map((ray, i) => {
                let [col] = walls
                    .map(wall => cast(ray, wall))
                    .filter(Boolean)
                // .sort((a, b) => Math.hypot(a!.x, a!.y) - Math.hypot(b!.x, b!.y));
                if (col) return <line key={i} x1={ray.a.x} y1={ray.a.y} x2={col.x} y2={col.y} stroke="white"/>;
            })}
            {walls.map(({a, b}, i) => (
                <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="white"/>
            ))}
        </svg>
    );
};

render(<App/>, document.getElementById("root"));
