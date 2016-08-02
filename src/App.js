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

const DISEASE_CLASSES = {};
const COLOR_TABLE = {};

(function() {
    const COLORS = [
        "#cee6ca", "#90cfce", "#68becf", "#3d96c1", "#3371a9", "#254a92", "#19257b", "#131a55",
        "#5a362d", "#99442a", "#d34e26", "#e66b32", "#ec8f42", "#f2b153", "#f9d464", "#fdec7c",
        "#f8c0a7", "#ef8f97", "#e85f89", "#c04389", "#8e2f91", "#63218f", "#4a166b", "#321049"
    ];

    const comp = (a, b) => (a.class < b.class) ? -1 : ((a.class > b.class) ? 1 : 0);
    DISEASEOME.sort(comp);

    let index = 0;
    DISEASEOME.forEach(disease => {
        DISEASE_CLASSES[disease.class] = DISEASE_CLASSES[disease.class] || [];
        DISEASE_CLASSES[disease.class].push(disease);

        if (!COLOR_TABLE[disease.class]) {
            COLOR_TABLE[disease.class] = COLORS[index++];
        }
    });
})();

var CSSSheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// WebKit hack :(
	style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();

function layout_chromosome(chromosome, y, scale) {
    const quads = {};
    const anchors = {};
    const map = {};

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
                if (color === "x") { fill = FILL_X; }
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

                map[name] = map[name] || [];
                map[name].push([fill, quads[fill].length - 1]);

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
                if (color === "x") { fill = FILL_X; }
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

                map[name] = map[name] || [];
                map[name].push([fill, quads[fill].length - 1]);

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
        map: map,
        anchors: anchors,
        text: [0, y - (10 * scale)],
        length: (curY - y) + (30 * scale)
    };
}

function layout_disease(layouts, layout, disease, offset) {
    const color = COLOR_TABLE[disease.class];
    layout.quads[color] = layout.quads[color] || [];
    for (let i = 0; i < disease.genes.length; i++) {
        const location = disease.genes[i].location;
        const locationName = location.slice(0, 3).join("");
        if (layouts[location[0]] &&
            layouts[location[0]].map[locationName]) {
            layouts[location[0]].map[locationName].forEach(quadInfo => {
                const quad = layouts[location[0]].quads[quadInfo[0]][quadInfo[1]];
                layout.quads[color].push(quad.map(point => [(point[0] / 8) + offset, point[1]]));
            })
        } else {
            console.log("Couldn't find location", locationName);
        }
    };
}

function layout_transform(layouts, fn) {
    for (var chromosome in layouts) {
        const layout = layouts[chromosome];
        const new_layout = {
            quads: {},
            lines: layout.lines.map(line => line.map(fn)),
            anchors: {},
            map: layout.map,
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

const START_THETA = -0.9;
const RADIAL_R = 360;
const RADIAL_RPRIME = -11.3;
// Map of [theta, r, theta]
const RADIAL_MAP = [[START_THETA, RADIAL_R]];
function get_radial(y) {
    let theta = RADIAL_MAP[RADIAL_MAP.length-1][0];
    let r = RADIAL_MAP[RADIAL_MAP.length-1][1];
    const index = Math.max(Math.floor(y), 0);
    while (RADIAL_MAP.length < index + 2) {
        const dTheta = 1.0 / r;
        theta += dTheta;
        r += RADIAL_RPRIME * dTheta;
        RADIAL_MAP.push([theta, r])
    }
    const interp = y - index;
    return {
        theta: (RADIAL_MAP[index][0] * (1-interp)) + (RADIAL_MAP[index+1][0] * interp),
        r: (RADIAL_MAP[index][1] * (1-interp)) + (RADIAL_MAP[index+1][1] * interp)
    };
}

function layout_radial(layouts, x, y, xOffset) {
    layout_transform(layouts, point => {
        const radial = get_radial(point[1]);
        const cos = Math.cos(radial.theta);
        const sin = Math.sin(radial.theta);
        return [
            x + ((radial.r + point[0] + xOffset) * cos),
            y + ((radial.r + point[0] + xOffset) * sin)
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
        ret.push(<path key={color} d={d} fill={color} />);
    }
    return ret;
}

const FINAL_LAYOUTS = {};
(function() {
    let y = 20;
    CHROMOSOMES.forEach(chromosome => {
        const chromoLayout = layout_chromosome(
            chromosome, y, 1.0);
        y += chromoLayout.length + 10;

        FINAL_LAYOUTS[chromosome.name] = chromoLayout;
    });

    let offset = 8;
    DISEASEOME.forEach(disease => {
        if (!FINAL_LAYOUTS["D" + disease.class]) {
            FINAL_LAYOUTS["D" + disease.class] = {
                quads: {},
                lines: [],
                map: {},
                anchors: [],
                text: [0, 0],
                length: 0
            };
            offset += 1.6;
        }
        layout_disease(FINAL_LAYOUTS, FINAL_LAYOUTS["D" + disease.class], disease, offset)
    });

    layout_radial(FINAL_LAYOUTS, 380.0, 360.0, 10);
})();

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

function sanitizeName(name) {
    return name.toLowerCase().replace(new RegExp('[^a-z]', 'g'), "_");
}

class DiseaseClass extends Component {
    render() {
        const quads = layout_to_paths(this.props.layout);

        return <g id={"DIS_" + sanitizeName(this.props.className)}>
            {quads}
        </g>;
    }
}

class DiseaseGenes extends Component {
    render() {
        const genLayout = {
            quads: {}
        };
        const color = COLOR_TABLE[this.props.disease.class];
        genLayout.quads[color] = [];

        this.props.disease.genes.forEach(gene => {
            const location = gene.location.slice(0, 3).join("");
            const quadMap = this.props.allLayouts[gene.location[0]].map[location];
            if (quadMap) {
                quadMap.forEach(info => {
                    genLayout.quads[color].push(
                        this.props.allLayouts[gene.location[0]]
                            .quads[info[0]][info[1]]);
                })
            }
        })

        const quads = layout_to_paths(genLayout);

        return <g id={"DISG_" + sanitizeName(this.props.disease.name)}>
            {quads}
        </g>;
    }
}

class DiseaseList extends Component {
    state = {
        highlightedDisease: null,
        highlightedClass: null
    }

    handleMouseEnterDisease(disease) {
        this.setState({
            highlightedDisease: disease,
            highlightedClass: null
        });
    }

    handleMouseLeaveDisease(disease) {
        if (this.state.highlightedDisease &&
            this.state.highlightedDisease.name === disease.name) {
            this.setState({highlightedDisease: null});
        }
    }

    handleMouseEnterClass(cls) {
        this.setState({
            highlightedDisease: null,
            highlightedClass: cls
        });
    }

    handleMouseLeaveClass(cls) {
        if (this.state.highlightedClass &&
            this.state.highlightedClass === cls) {
            this.setState({highlightedClass: null});
        }
    }

    render() {
        const lists = [];
        let lastClass = null;
        DISEASEOME.forEach(disease => {
            const color = COLOR_TABLE[disease.class];
            let list  = lists[lists.length - 1];
            if (disease.class !== lastClass) {
                const style = {
                    borderLeft: "4px solid " + color,
                    fontWeight: "bold",
                    listStyle: "none",
                    padding: 4,
                    textAlign: "left",
                };
                if (this.state.highlightedClass &&
                    this.state.highlightedClass === disease.class) {
                    style.backgroundColor = "#daa";
                }

                list = [];
                lists.push(list);

                list.push(<li
                    key={disease.class}
                    onMouseEnter={() => this.handleMouseEnterClass(disease.class)}
                    onMouseLeave={() => this.handleMouseLeaveClass(disease.class)}
                    style={style}
                >
                    {disease.class}
                </li>);
                lastClass = disease.class;
            }

            const style = {
                borderLeft: "4px solid " + color,
                listStyle: "none",
                paddingLeft: 16,
                textAlign: "left",
            };
            if (this.state.highlightedDisease &&
                this.state.highlightedDisease.name === disease.name) {
                style.backgroundColor = "#daa";
            } else if (this.state.highlightedClass &&
                this.state.highlightedClass === disease.class) {
                style.backgroundColor = "#daa";
            }
            list.push(<li
                key={disease.name}
                onMouseEnter={() => this.handleMouseEnterDisease(disease)}
                onMouseLeave={() => this.handleMouseLeaveDisease(disease)}
                style={style}
            >
                {disease.name} ({disease.genes.length})
            </li>);
        })
        return <div>
            {lists.map((items, idx) => <ul style={{padding: 0}} key={idx}>
                {items}
            </ul>)}
        </div>;
    }

    componentDidUpdate() {
        while (CSSSheet.cssRules.length > 0) {
            if (CSSSheet.deleteRule) {
                CSSSheet.deleteRule(0);
            } else {
                CSSSheet.removeRule(0);
            }
        }
        const namesToHighlight = [];

        if (this.state.highlightedDisease) {
            namesToHighlight.push(
                sanitizeName(this.state.highlightedDisease.name));

        } else if (this.state.highlightedClass) {
            DISEASEOME.forEach(disease => {
                if (disease.class === this.state.highlightedClass) {
                    namesToHighlight.push(sanitizeName(disease.name));
                }
            })
        }

        namesToHighlight.forEach(name => {
            CSSSheet.insertRule(
                "g#DIS_" + name + " path "
                + "{ opacity: 0.9; stroke-width: 4; stroke-linecap: round; }",
                0);
            CSSSheet.insertRule(
                "g#DISG_" + name + " path "
                + "{ opacity: 0.9;  }",
                0);
        });
    }
}

class App extends Component {
    state = {}

    render() {
        const chromosomes = [];
        CHROMOSOMES.forEach(chromosome => {
            chromosomes.push(<Chromosome
                chromosome={chromosome}
                key={chromosome.name}
                layout={FINAL_LAYOUTS[chromosome.name]}
            />);
        });
        const diseases = [];
        for (let className in DISEASE_CLASSES) {
            diseases.push(<DiseaseClass
                center={[600.0, 400.0]}
                className={className}
                key={className}
                layout={FINAL_LAYOUTS["D" + className]}
            />);
        }

        /*
        const diseaseGenes = DISEASEOME.map(
            disease => <DiseaseGenes
                allLayouts={FINAL_LAYOUTS}
                center={[600.0, 400.0]}
                disease={disease}
                key={disease.name}
                layout={FINAL_LAYOUTS["D" + disease.name]}
            />);
            */

        return (
            <div className="App" style={{display: "flex", height: "100%", width: "100%", position: "fixed"}}>
                <div style={{padding: 10, overflowY: "auto", width: "30%"}} key="diseaseList">
                    <DiseaseList />
                </div>
                <svg viewBox="0 0 800 760" style={{height: "100%", margin: "auto"}} key="svg">
                    {chromosomes}
                    <g id="diseases">
                        {diseases}
                    </g>
                    {/*<g id="disease-genes">
                        {diseaseGenes}
                    </g>*/}
                </svg>
            </div>
        );
    }
}

export default App;
