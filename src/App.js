import React, { Component } from 'react';
import './App.css';

import { CHROMOSOMES } from './chromosomes.js';
import { DISEASEOME } from './diseaseome.js';

const RAND = [3, 3, 4, 4, 3, 5, 4, 4, 5, 5, 3, 5, 3, 5, 5, 4, 5, 3, 3, 3, 5, 4, 4, 5, 3, 5, 3, 5, 3, 5, 3, 3, 4, 4, 3, 3, 5, 3, 3, 3, 3, 5, 3, 4, 5, 5, 3, 5, 4, 3, 4, 5, 5, 4, 3, 5, 4, 4, 4, 5, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4, 5, 4, 3, 3, 4, 5, 3, 3, 5, 4, 5, 5, 3, 5, 3, 3, 5, 3, 4, 5, 5, 4, 3, 5, 5, 3, 5, 4, 4, 3];


const CHROM_WIDTH = 20.0;
const FILL_WT = "#efefef";
const FILL_LT = "#cfcfcf";
const FILL_MD = "#afafaf";
const FILL_DK = "#7f7f7f";
const FILL_BK = "#4f4f4f";
const FILL_X = "#000080";
const FILL_SEL = "#900000";

const COLOR_TABLE = {};
(function() {
    const COLORS = [
        "#cee6ca", "#90cfce", "#68becf", "#3d96c1", "#3371a9", "#254a92", "#19257b", "#131a55",
        "#fdec7c", "#f9d464", "#f2b153", "#ec8f42", "#e66b32", "#d34e26", "#99442a", "#5a362d",
        "#f8c0a7", "#ef8f97", "#e85f89", "#c04389", "#8e2f91", "#63218f", "#4a166b", "#321049"
    ];

    let index = 0;
    DISEASEOME.forEach(disease => {
        if (!COLOR_TABLE[disease.class]) {
            COLOR_TABLE[disease.class] = COLORS[index++];
        }
    })
})();

function layout_linear(chromosome, locations, scale) {
    const quads = {};
    const anchors = {};

    var idx, band, subband;
    var randidx = 0;

    var r = (CHROM_WIDTH * scale) / 2;
    var pad = 10 * scale;
    var curY = 0;

    quads[FILL_LT] = quads[FILL_LT] || [];
    quads[FILL_LT].push([
        [r * -1.000, pad - (r * 0.000)], [r * -0.995, pad - (r * 0.098)],
        [r * -0.981, pad - (r * 0.195)], [r * -0.957, pad - (r * 0.290)],
        [r * -0.924, pad - (r * 0.383)], [r * -0.882, pad - (r * 0.471)],
        [r * -0.831, pad - (r * 0.556)], [r * -0.773, pad - (r * 0.634)],
        [r * -0.707, pad - (r * 0.707)], [r * -0.634, pad - (r * 0.773)],
        [r * -0.556, pad - (r * 0.831)], [r * -0.471, pad - (r * 0.882)],
        [r * -0.383, pad - (r * 0.924)], [r * -0.290, pad - (r * 0.957)],
        [r * -0.195, pad - (r * 0.981)], [r * -0.098, pad - (r * 0.995)],
        [r * 0.000, pad - (r * 1.000)], [r * 0.098, pad - (r * 0.995)],
        [r * 0.195, pad - (r * 0.981)], [r * 0.290, pad - (r * 0.957)],
        [r * 0.383, pad - (r * 0.924)], [r * 0.471, pad - (r * 0.882)],
        [r * 0.556, pad - (r * 0.831)], [r * 0.634, pad - (r * 0.773)],
        [r * 0.707, pad - (r * 0.707)], [r * 0.773, pad - (r * 0.634)],
        [r * 0.831, pad - (r * 0.556)], [r * 0.882, pad - (r * 0.471)],
        [r * 0.924, pad - (r * 0.383)], [r * 0.957, pad - (r * 0.290)],
        [r * 0.981, pad - (r * 0.195)], [r * 0.995, pad - (r * 0.098)],
        [r * 1.000, pad - (r * 0.000)]
    ]);
    anchors[chromosome.name + "pter"] = [-r, pad];
    anchors[chromosome.name + "p"] = [-r, pad];

    curY += pad;

    for (idx = chromosome.pRegions.length - 1; idx >= 0; idx--) {
        const region = chromosome.pRegions[idx];
        for (band = region.pattern.length - 1; band >= 0; band--) {
            const name = chromosome.name + "p" + region.num + (band+1);
            const oldY = curY;

            for (subband = region.pattern[band].length - 1; subband >= 0; subband--) {
                const color = region.pattern[band][subband];
                let fill = FILL_WT;
                if (locations.indexOf(name) >= 0) { fill = FILL_SEL; }
                else if (color === "x") { fill = FILL_X; }
                else if (color === "l") { fill = FILL_LT; }
                else if (color === "m") { fill = FILL_MD; }
                else if (color === "d") { fill = FILL_DK; }
                else if (color === "b") { fill = FILL_BK; }

                let height = RAND[(randidx++) % 100];
                if (color === "w") { height += 1; }
                height *= scale;

                quads[fill] = quads[fill] || [];
                quads[fill].push([
                    [-r, curY],
                    [r, curY],
                    [r, height + curY],
                    [-r, height + curY],
                ]);
                curY += height;
            }

            anchors[name] = [-r, (curY + oldY) * 0.5];
        }
    }

    quads[FILL_LT].push([
        [-r, curY],
        [r, curY],
        [0.75*r, curY + (10 * scale)],
        [r, curY + (20 * scale)],
        [-r, curY + (20 * scale)],
        [-0.75*r, curY + (10 * scale)],
    ]);
    anchors[chromosome.name + "cen"] = [-r, curY + (10 * scale)];

    curY += 20 * scale;

    for (idx = 0; idx < chromosome.qRegions.length; idx++) {
        const region = chromosome.qRegions[idx];
        for (band = 0; band < region.pattern.length; band++) {
            const name = chromosome.name + "q" + region.num + (band+1);
            const oldY = curY;

            for (subband = 0; subband < region.pattern[band].length; subband++) {
                const color = region.pattern[band][subband];
                let fill = FILL_WT;
                if (locations.indexOf(name) >= 0) { fill = FILL_SEL; }
                else if (color === "x") { fill = FILL_X; }
                else if (color === "l") { fill = FILL_LT; }
                else if (color === "m") { fill = FILL_MD; }
                else if (color === "d") { fill = FILL_DK; }
                else if (color === "b") { fill = FILL_BK; }
                let height = RAND[(randidx++) % 100];
                if (color === "w") { height += 1; }

                quads[fill] = quads[fill] || [];
                quads[fill].push([
                    [-r, curY],
                    [r, curY],
                    [r, curY + (height * scale)],
                    [-r, curY + (height * scale)],
                ]);
                curY += height;
            }

            anchors[name] = [-r, (curY + oldY) * 0.5];
        }
    }

    quads[FILL_LT].push([
        [r * 1.000, curY + (r * 0.000)], [r * 0.995, curY + (r * 0.098)],
        [r * 0.981, curY + (r * 0.195)], [r * 0.957, curY + (r * 0.290)],
        [r * 0.924, curY + (r * 0.383)], [r * 0.882, curY + (r * 0.471)],
        [r * 0.831, curY + (r * 0.556)], [r * 0.773, curY + (r * 0.634)],
        [r * 0.707, curY + (r * 0.707)], [r * 0.634, curY + (r * 0.773)],
        [r * 0.556, curY + (r * 0.831)], [r * 0.471, curY + (r * 0.882)],
        [r * 0.383, curY + (r * 0.924)], [r * 0.290, curY + (r * 0.957)],
        [r * 0.195, curY + (r * 0.981)], [r * 0.098, curY + (r * 0.995)],
        [r * 0.000, curY + (r * 1.000)], [r * -0.098, curY + (r * 0.995)],
        [r * -0.195, curY + (r * 0.981)], [r * -0.290, curY + (r * 0.957)],
        [r * -0.383, curY + (r * 0.924)], [r * -0.471, curY + (r * 0.882)],
        [r * -0.556, curY + (r * 0.831)], [r * -0.634, curY + (r * 0.773)],
        [r * -0.707, curY + (r * 0.707)], [r * -0.773, curY + (r * 0.634)],
        [r * -0.831, curY + (r * 0.556)], [r * -0.882, curY + (r * 0.471)],
        [r * -0.924, curY + (r * 0.383)], [r * -0.957, curY + (r * 0.290)],
        [r * -0.981, curY + (r * 0.195)], [r * -0.995, curY + (r * 0.098)],
        [r * -1.000, curY + (r * 0.000)]
    ]);
    anchors[chromosome.name + "qter"] = [-r, curY];
    anchors[chromosome.name + "q"] = [-r, curY];

    curY += 10 * scale;

    return {
        quads: quads,
        anchors: anchors,
        text: [0, curY + (20 * scale)],
        length: curY + (30 * scale)
    };
}

function layout_transform(layout, fn) {
    const new_layout = {
        quads: {},
        anchors: {},
        text: fn(layout.text),
        length: layout.length
    }
    for (var color in layout.quads) {
        new_layout.quads[color] = layout.quads[color].map(quad => quad.map(fn));
    }
    for (var anchorName in layout.anchors) {
        new_layout.anchors[anchorName] = fn(layout.anchors[anchorName]);
    }
    return new_layout;
}

function layout_translate(layout, x, y) {
    return layout_transform(layout, point => [point[0] + x, point[1] + y]);
}

function layout_radial(layout, x, y, thetaScale, startRadius, radiusSkew) {
    const invScale = 0.5 / thetaScale;
    const invSkew = radiusSkew * invScale;
    return layout_transform(layout, point => [
        x + (Math.cos(Math.PI * point[1] * invScale) * (startRadius + point[0] + (invSkew * point[1]))),
        y + (Math.sin(Math.PI * point[1] * invScale) * (startRadius + point[0] + (invSkew * point[1])))
    ]);
}

function layout_to_paths(layout) {
    let ret = [];
    for (var color in layout.quads) {
        const d = layout.quads[color]
            .map(quad => (
                "M " + quad[0][0] + " " + quad[0][1] +
                " L " + quad.slice(1).map(
                    point => point[0] + " " + point[1]).join(" ")) +
                " Z ")
            .join(" ");
        ret.push(<path d={d} fill={color} />);
    }
    return ret;
}

class Chromosome extends Component {
    render() {
        const chromosome = this.props.chromosome;
        const quads = layout_to_paths(this.props.layout);
        return <g
            id={"LOC" + chromosome.name}
        >
            {quads}
            <text
                textAnchor="middle"
                transform={"translate(" + this.props.layout.text.join(",") + ")"}
            >
                {chromosome.name}
            </text>
        </g>;
    }
}

class Disease extends Component {
    getLocation(location) {
        const locationName = location.slice(0, 3).join("");
        if (this.props.layouts[location[0]] &&
            this.props.layouts[location[0]].anchors[locationName]) {
            return this.props.layouts[location[0]].anchors[locationName];
        }
        console.log("Couldn't find location", locationName)
        return null;
    }

    render() {
        const lines = [];
        const locations = [];
        for (let i = 0; i < this.props.disease.genes.length; i++) {
            const location = this.getLocation(this.props.disease.genes[i].location);
            if (location) {
                locations.push(location);
            }
        }
        for (let i = 0; i < locations.length; i++) {
            for (let j = i + 1; j < locations.length; j++) {
                const d = "M " + locations[i].join(" ") + " Q " + this.props.center.join(" ") + " " + locations[j].join(" ");
                lines.push(<path
                    d={d}
                    fill="none"
                    opacity={0.05}
                    stroke={COLOR_TABLE[this.props.disease.class]}
                    strokeWidth={1}
                />);
            }
        }
        return <g>{lines}</g>;
    }
}

class App extends Component {
    state = {
        showLocations: []
    }

    render() {
        const children = [];
        const layouts = {};
        let y = 0;
        CHROMOSOMES.forEach(chromosome => {
            const layout = layout_radial(
                layout_translate(
                    layout_linear(chromosome, this.state.showLocations, 1.0),
                    0, y),
                600.0, 400.0, 500.0, 390.0, -20.0);

            children.push(<Chromosome
                chromosome={chromosome}
                layout={layout}
                x={0}
                y={y}
            />);

            layouts[chromosome.name] = layout;

            y += layout.length + 10;
        });
        const diseases = DISEASEOME.map(
            disease => <Disease
                center={[600.0, 400.0]}
                disease={disease}
                layouts={layouts}
            />);

        return (
            <div className="App" style={{display: "flex"}}>
                <svg width="1200" height="800">
                    {children}
                    {diseases}
                </svg>
            </div>
        );
    }
}

export default App;
