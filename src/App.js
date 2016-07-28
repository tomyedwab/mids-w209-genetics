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

function layout_chromosome(chromosome, locations, y, scale) {
    const quads = {};
    const anchors = {};

    var idx, band, subband;
    var randidx = 0;

    var r = (CHROM_WIDTH * scale) / 2;
    var pad = 10 * scale;
    var curY = y + pad;

    quads[FILL_LT] = quads[FILL_LT] || [];
    quads[FILL_LT].push([
        [r * -1.000, curY - (r * 0.000)], [r * -0.995, curY - (r * 0.098)],
        [r * -0.981, curY - (r * 0.195)], [r * -0.957, curY - (r * 0.290)],
        [r * -0.924, curY - (r * 0.383)], [r * -0.882, curY - (r * 0.471)],
        [r * -0.831, curY - (r * 0.556)], [r * -0.773, curY - (r * 0.634)],
        [r * -0.707, curY - (r * 0.707)], [r * -0.634, curY - (r * 0.773)],
        [r * -0.556, curY - (r * 0.831)], [r * -0.471, curY - (r * 0.882)],
        [r * -0.383, curY - (r * 0.924)], [r * -0.290, curY - (r * 0.957)],
        [r * -0.195, curY - (r * 0.981)], [r * -0.098, curY - (r * 0.995)],
        [r * 0.000, curY - (r * 1.000)], [r * 0.098, curY - (r * 0.995)],
        [r * 0.195, curY - (r * 0.981)], [r * 0.290, curY - (r * 0.957)],
        [r * 0.383, curY - (r * 0.924)], [r * 0.471, curY - (r * 0.882)],
        [r * 0.556, curY - (r * 0.831)], [r * 0.634, curY - (r * 0.773)],
        [r * 0.707, curY - (r * 0.707)], [r * 0.773, curY - (r * 0.634)],
        [r * 0.831, curY - (r * 0.556)], [r * 0.882, curY - (r * 0.471)],
        [r * 0.924, curY - (r * 0.383)], [r * 0.957, curY - (r * 0.290)],
        [r * 0.981, curY - (r * 0.195)], [r * 0.995, curY - (r * 0.098)],
        [r * 1.000, curY - (r * 0.000)]
    ]);
    anchors[chromosome.name + "pter"] = [-r, curY];
    anchors[chromosome.name + "p"] = [-r, curY];

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
        lines: [],
        anchors: anchors,
        text: [0, y - (10 * scale)],
        length: (curY - y) + (30 * scale)
    };
}

function layout_disease(layouts, disease, offset) {
    const getLocation = function(location) {
        const locationName = location.slice(0, 3).join("");
        if (layouts[location[0]] &&
            layouts[location[0]].anchors[locationName]) {
            return layouts[location[0]].anchors[locationName];
        }
        console.log("Couldn't find location", locationName)
        return null;
    };

    const lines = [];
    let x = 0;
    let minY = 99999999, maxY = 0;
    for (let i = 0; i < disease.genes.length; i++) {
        const location = getLocation(disease.genes[i].location);
        if (location) {
            x = location[0] - offset;
            if (location[1] < minY) { minY = location[1]; }
            if (location[1] > maxY) { maxY = location[1]; }

            lines.push([location, [x, location[1]]]);
        }
    }

    if (maxY > minY) {
        const connector = [];
        for (let y = minY; y < maxY; y += 5) {
            connector.push([x, y]);
        }
        connector.push([x, maxY]);
        lines.push(connector);
    }

    return {
        quads: [],
        lines: lines,
        anchors: [],
        text: [0, 0],
        length: 0
    };
}

function layout_transform(layouts, fn) {
    for (var chromosome in layouts) {
        const layout = layouts[chromosome];
        const new_layout = {
            quads: {},
            lines: layout.lines.map(line => line.map(fn)),
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
        layouts[chromosome] = new_layout;
    }
}

// theta(y) = f(y), theta(0) = 0
// r(theta) = R - R'*theta
// dtheta/dy = 1 / (R^2 - 2*R'*theta + R'^2*theta^2)
// p(y) = <r * cos(theta), r * sin(theta)>
const START_THETA = -0.9;
const RADIAL_R = 390;
const RADIAL_RPRIME = -14.0;
// Map of [theta, r, theta]
const RADIAL_MAP = [[START_THETA, RADIAL_R]];
function get_radial(y) {
    let theta = RADIAL_MAP[RADIAL_MAP.length-1][0];
    const index = Math.max(Math.floor(y), 0);
    while (RADIAL_MAP.length < index + 2) {
        const dTheta = 1.0 / (RADIAL_R + (RADIAL_RPRIME * theta));
        theta += dTheta;
        const r = RADIAL_R + (RADIAL_RPRIME * theta);
        RADIAL_MAP.push([theta, r])
    }
    const interp = y - index;
    return {
        theta: (RADIAL_MAP[index][0] * (1-interp)) + (RADIAL_MAP[index+1][0] * interp),
        r: (RADIAL_MAP[index][1] * (1-interp)) + (RADIAL_MAP[index+1][1] * interp)
    };
}

function layout_radial(layouts, x, y) {
    layout_transform(layouts, point => {
        const radial = get_radial(point[1]);
        const cos = Math.cos(radial.theta);
        const sin = Math.sin(radial.theta);
        return [
            x + ((radial.r + point[0]) * cos),
            y + ((radial.r + point[0]) * sin)
        ];
    });
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
                transform={"translate(" + this.props.layout.text[0] + "," + (this.props.layout.text[1]+5) + ")"}
            >
                {chromosome.name}
            </text>
        </g>;
    }
}

class Disease extends Component {
    render() {
        const lines = this.props.layout.lines.map(line => <path
            d={"M " + line[0].join(" ") + " L " + line.slice(1).map(point => point.join(" ")).join(" ")}
            fill="none"
            opacity={0.1}
            stroke={COLOR_TABLE[this.props.disease.class]}
            strokeWidth={1}
        />);

        return <g>{lines}</g>;
    }
}

class App extends Component {
    state = {
        showLocations: []
    }

    render() {
        const layouts = {};
        let y = 20;
        CHROMOSOMES.forEach(chromosome => {
            const chromoLayout = layout_chromosome(
                chromosome, this.state.showLocations, y, 1.0);
            y += chromoLayout.length + 10;

            layouts[chromosome.name] = chromoLayout;
        });

        let offset = 5;
        DISEASEOME.forEach(disease => {
            layouts["D" + disease.name] = layout_disease(layouts, disease, (disease.genes.length > 1) ? offset : 3);
            if (disease.genes.length > 1) {
                offset += 0.13;
            }
        });

        layout_radial(layouts, 380.0, 360.0);

        console.log(RADIAL_MAP);

        const children = [];
        CHROMOSOMES.forEach(chromosome => {
            children.push(<Chromosome
                chromosome={chromosome}
                layout={layouts[chromosome.name]}
            />);
        });
        const diseases = DISEASEOME.map(
            disease => <Disease
                center={[600.0, 400.0]}
                disease={disease}
                layout={layouts["D" + disease.name]}
            />);

        return (
            <div className="App" style={{display: "flex", height: "100%", width: "100%", position: "fixed"}}>
                <svg viewBox="0 0 800 760" style={{height: "100%", margin: "auto"}}>
                    {children}
                    {diseases}
                </svg>
            </div>
        );
    }
}

export default App;
