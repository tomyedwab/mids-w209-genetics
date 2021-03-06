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

const classComparator = (a, b) => (a.className < b.className) ? -1 : ((a.className > b.className) ? 1 : 0);
const prevalenceComparator = (a, b) => (+(a.prevalence || 0) > +(b.prevalence || 0)) ? -1 : ((+(a.prevalence || 0) < +(b.prevalence || 0)) ? 1 : 0);

(function() {
    const COLORS = [
        "#90cfce", "#68becf", "#3d96c1", "#3371a9", "#254a92", "#19257b", "#131a55",
        "#5a362d", "#99442a", "#d34e26", "#e66b32", "#ec8f42", "#f2b153",
        "#f8c0a7", "#ef8f97", "#e85f89", "#c04389", "#8e2f91", "#63218f", "#4a166b", "#321049"
    ];

    DISEASEOME.sort(classComparator);

    let index = 0;
    DISEASEOME.forEach(disease => {
        if (disease.className === "Unclassified" || disease.className === "multiple" ||
            disease.className === "Connective tissue") {
            return;
        }
        DISEASE_CLASSES[disease.className] = DISEASE_CLASSES[disease.className] || [];
        DISEASE_CLASSES[disease.className].push(disease);

        if (!COLOR_TABLE[disease.className]) {
            COLOR_TABLE[disease.className] = COLORS[index++];
        }
    });

    for (let className in DISEASE_CLASSES) {
        DISEASE_CLASSES[className].sort(prevalenceComparator);
    }
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

function layout_disease_class(layouts, layout, disease, offset) {
    const color = COLOR_TABLE[disease.className];
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

function layout_disease(layouts, disease, chromosome) {
    const color = COLOR_TABLE[disease.className];
    const layout = {
        quads: {},
        lines: [],
        map: {},
        anchors: {},
        text: [0, 0],
        length: 0
    }
    layout.quads[color] = layout.quads[color] || [];
    for (let i = 0; i < disease.genes.length; i++) {
        const location = disease.genes[i].location;
        if (location[0] === chromosome) {
            const locationName = location.slice(0, 3).join("");
            if (layouts[location[0]] &&
                layouts[location[0]].map[locationName]) {
                layouts[location[0]].map[locationName].forEach(quadInfo => {
                    const quad = layouts[location[0]].quads[quadInfo[0]][quadInfo[1]];
                    layout.quads[color].push(quad.map(point => [point[0] * 1.2, point[1]]));
                })
            } else {
                console.log("Couldn't find location", locationName);
            }
        }
    };
    if (layout.quads[color].length > 0) {
        return layout;
    }
    return null;
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
        if (!FINAL_LAYOUTS["DC_" + disease.className]) {
            FINAL_LAYOUTS["DC_" + disease.className] = {
                quads: {},
                lines: [],
                map: {},
                anchors: [],
                text: [0, 0],
                length: 0
            };
            offset += 1.6;
        }
        layout_disease_class(FINAL_LAYOUTS, FINAL_LAYOUTS["DC_" + disease.className], disease, offset)
        CHROMOSOMES.forEach(chromosome => {
            const layout = layout_disease(FINAL_LAYOUTS, disease, chromosome.name);
            if (layout) {
                FINAL_LAYOUTS["D_" + sanitizeName(disease.name) + "_" + chromosome.name] = layout;
            }
        });
    });

    layout_radial(FINAL_LAYOUTS, 380.0, 360.0, 10);
})();

class Header extends Component {
    state = {
        expanded: true
    }

    render() {
        return <div
            className={"header " + (this.state.expanded ? "open" : "closed")}
        >
            <button
                className="showButton"
                onClick={() => this.setState({expanded: true})}
            >
                [show introduction]
            </button>
            <div className="title">Genetics and Disease</div>
            <div className="description">
                <p>The human genome includes 24 distinct chromosomes,
                comprising 22 autosomal pairs and 2 sex-linked, X/Y chromosomes.
                Although there is an estimated 23,000 protein-encoding genes in
                the genome, only 16,000 genes have been mapped to chromosome
                locations, with around 4,000 of those genes linked to almost
                6,000 genetic diseases.</p>

                <p>This interactive visualization is an educational tool
                illustrating the human genome and the most common genetic
                diseases. Click on a disease class to expand to a list of
                diseases in that class. Click on individual chromosomes to view
                only diseases associated with that chromosome. Hover over
                disease classes and individual diseases to highlight associated,
                color-coded gene locations and view supporting Wikipedia
                information.</p>

                <p><i>Created by Ying Chan, Marcus DeMaster, Kevin McLanahan and
                Tom Yedwab.</i></p>

                <p><strong>Data Sources and Citations:</strong></p>

                <ul>
                <li>OMIM Gene Map Statistics. (2016). Omim.org.
                Retrieved 7 August 2016, from{" "}
                <a href="https://omim.org/statistics/geneMap" target="_">
                https://omim.org/statistics/geneMap</a></li>

                <li>ApiHelp. (2016). Wikipedia. Retrieved 7 August 2016, from{" "}
                <a href="https://en.wikipedia.org/w/api.php" target="_">
                https://en.wikipedia.org/w/api.php</a></li>

                <li>Barabasilab. (2016). Barabasilab.com. Retrieved 7
                August 2016, from{" "}
                <a href="http://www.barabasilab.com/pubs/CCNR-ALB_Publications/200705-14_PNAS-HumanDisease/Suppl/supplementary_tableS1.txt" target="_">
                http://www.barabasilab.com/pubs/CCNR-ALB_Publications/200705-14_PNAS-HumanDisease/Suppl/supplementary_tableS1.txt
                </a></li>

                <li>Supporting Information. (2016). Pnas.org. Retrieved 7 August
                2016, from{" "}
                <a href="http://www.pnas.org/content/suppl/2010/03/16/0802208105.DC1" target="_">
                http://www.pnas.org/content/suppl/2010/03/16/0802208105.DC1
                </a></li>
                </ul>
            </div>
            <button
                className="hideButton"
                onClick={() => this.setState({expanded: false})}
            >
                Dismiss
            </button>
        </div>;
    }
}

class Chromosome extends Component {
    render() {
        const chromosome = this.props.chromosome;
        const quads = layout_to_paths(this.props.layout);
        return <g
            id={"CHR_" + chromosome.name}
            onClick={(e) => this.props.onSelectChromosome(e, chromosome.name)}
            onMouseEnter={() => this.props.onMouseEnterChromosome(chromosome.name)}
            onMouseLeave={() => this.props.onMouseLeaveChromosome(chromosome.name)}
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

    shouldComponentUpdate(nextProps, nextState) {
        // Never re-render the chromosomes
        return false;
    }
}

function sanitizeName(name) {
    return name.toLowerCase().replace(new RegExp('[^a-z]', 'g'), "_");
}

class DiseaseClass extends Component {
    render() {
        return <g id={"DGRP_" + sanitizeName(this.props.className)}>
            {layout_to_paths(this.props.layout)}
        </g>;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Never re-render the classes
        return false;
    }
}

class DiseaseGenes extends Component {
    render() {
        const paths = [];
        CHROMOSOMES.forEach(chromosome => {
            const layout = this.props.layouts["D_" + sanitizeName(this.props.disease.name) + "_" + chromosome.name];
            if (layout &&
                (!this.props.selectedChromosome ||
                 this.props.selectedChromosome === chromosome.name)) {
                paths.push(layout_to_paths(layout));
            }
        });
        return <g id={"DIS_" + sanitizeName(this.props.disease.name)}>
            {paths}
        </g>;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Never re-render the diseases
        return false;
    }
}

class DiseaseList extends Component {
    state = {
        diseaseFilter: ""
    }

    renderSearchBox() {
        return <div className="search">
            Filter by name:
            <input
                placeholder="Disease name"
                value={this.state.diseaseFilter}
                onChange={evt => this.setState({diseaseFilter: evt.target.value})}
            />
        </div>;
    }

    renderTooltip() {
        if (this.props.highlightedDisease &&
            this.props.highlightedDisease.description.replace(" ", "") !== "") {
            return <div className="tooltip" style={{opacity: 1.0}}>
                {this.props.highlightedDisease.description}
                <span className="attribution">[From Wikipedia]</span>
            </div>;
        } else {
            return <div className="tooltip" />
        }
    }

    renderClasses() {
        const listElements = [];
        for (let className in DISEASE_CLASSES) {
            const color = COLOR_TABLE[className];
            const style = {
                borderLeft: "32px solid " + color
            };
            let clickText = <span />;
            let classes = "columns";
            if (this.props.highlightedClass &&
                this.props.highlightedClass === className) {
                style.backgroundColor = color;
                style.color = "#fff";
                clickText = <span className="click">➠</span>;
                classes += " selected";
            }
            listElements.push(<li
                key={sanitizeName(className)}
                className={classes}
                style={style}
                onMouseEnter={() => this.props.handleMouseEnterClass(className)}
                onMouseLeave={() => this.props.handleMouseLeaveClass(className)}
                onClick={() => this.props.handleSelectClass(className)}
            >
                {/* Somehow in the minified code, className gets mangled? */}
                <div className="col1"><span className="name">{"" + className}</span>{clickText}</div>
                <div className="col2">{DISEASE_CLASSES[className].length}</div>
            </li>);
        }

        return <div className="diseaseListWrapper">
            {this.renderSearchBox()}
            <div className="heading columns indented">
                <div className="col1">Disease class</div>
                <div className="col2"># of diseases</div>
            </div>
            <ul className="diseaseList">
                {listElements}
            </ul>
        </div>;
    }

    renderDiseases(diseases) {
        return diseases.map((disease) => {
            let prev = "";
            let prevPct = 0;
            if (disease.prevalence) {
                prev = "1 in " + Math.round(1/disease.prevalence);
                prevPct = 100 * Math.min(1, -1/Math.log(disease.prevalence));
            }
            const color = COLOR_TABLE[disease.className];
            let barColor = color;
            const style = {};
            if (this.props.highlightedDisease &&
                this.props.highlightedDisease.name === disease.name) {
                style.backgroundColor = color;
                style.color = "#fff";
                barColor = "#fff";
            }

            const geneCount = disease.genes
                .filter(gene => (
                    !this.props.selectedChromosome ||
                    this.props.selectedChromosome === gene.location[0]))
                .length;

            return <li
                key={sanitizeName(disease.name)}
                className="columns"
                onMouseEnter={() => this.props.handleMouseEnterDisease(disease)}
                onMouseLeave={() => this.props.handleMouseLeaveDisease(disease)}
                style={style}
            >
                <div className="col0">
                    <div style={{
                        backgroundColor: barColor,
                        height: 18,
                        position: "absolute",
                        right: 0,
                        top: 0,
                        width: prevPct + "%",
                        zIndex: -1
                    }} />
                    {prev}
                </div>
                <div className="col1">{disease.name}</div>
                <div className="col2">{geneCount}</div>
            </li>;
        });
    }

    renderDiseasesByClass(className, filter) {
        const diseases = DISEASE_CLASSES[className]
            .filter(disease => (filter === "") || disease.name.toLowerCase().indexOf(filter) >= 0);

        const listElements = this.renderDiseases(diseases);

        return <div className="diseaseListWrapper">
            {this.renderTooltip()}
            {this.renderSearchBox()}
            <div
                className="diseaseHeading"
                style={{backgroundColor: COLOR_TABLE[className]}}
            >
                <button onClick={() => this.props.handleSelectClass(null)}>
                    Back
                </button>
                {className} diseases
            </div>
            <div className="heading columns">
                <div className="col0">Prevalence</div>
                <div className="col1">Disease</div>
                <div className="col2"># of genes</div>
            </div>
            <ul className="diseaseList">
                {listElements}
            </ul>
        </div>;
    }

    renderDiseasesByChromosome(chromosome, filter) {
        const diseases = DISEASEOME.filter(
            disease => (disease.genes
                .filter(gene => gene.location[0] === chromosome)
                .length > 0))
            .filter(disease => (filter === "") || disease.name.toLowerCase().indexOf(filter) >= 0);

        diseases.sort(prevalenceComparator);

        const listElements = this.renderDiseases(diseases);

        return <div className="diseaseListWrapper">
            {this.renderTooltip()}
            {this.renderSearchBox()}
            <div
                className="diseaseHeading"
                style={{backgroundColor: "#666"}}
            >
                <button onClick={(e) => this.props.onSelectChromosome(e, null)}>
                    Back
                </button>
                Diseases on chromosome {chromosome}
            </div>
            <div className="heading columns">
                <div className="col0">Prevalence</div>
                <div className="col1">Disease</div>
                <div className="col2"># of genes</div>
            </div>
            <ul className="diseaseList">
                {listElements}
            </ul>
        </div>;
    }

    renderDiseasesByFilter(filter) {
        const diseases = DISEASEOME.filter(
            disease => disease.name.toLowerCase().indexOf(filter) >= 0);
        diseases.sort(prevalenceComparator);

        const listElements = this.renderDiseases(diseases);

        return <div className="diseaseListWrapper">
            {this.renderTooltip()}
            {this.renderSearchBox()}
            <div className="heading columns">
                <div className="col0">Prevalence</div>
                <div className="col1">Disease</div>
                <div className="col2"># of genes</div>
            </div>
            <ul className="diseaseList">
                {listElements}
            </ul>
        </div>;
    }

    render() {
        if (this.props.selectedChromosome) {
            return this.renderDiseasesByChromosome(
                this.props.selectedChromosome, this.state.diseaseFilter);
        }
        if (this.props.selectedClass) {
            return this.renderDiseasesByClass(
                this.props.selectedClass, this.state.diseaseFilter);
        }
        if (this.state.diseaseFilter !== "") {
            return this.renderDiseasesByFilter(
                this.state.diseaseFilter.toLowerCase());
        }
        return this.renderClasses();
    }
}

class App extends Component {
    state = {
        highlightedDisease: null,
        highlightedClass: null,
        highlightedChromosome: null,
        selectedClass: null,
        selectedChromosome: null
    }

    handleMouseEnterDisease(disease) {
        this.setState({
            highlightedChromosome: null,
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

    handleSelectClass(cls) {
        this.setState({
            highlightedDisease: null,
            highlightedClass: null,
            selectedChromosome: null,
            selectedClass: cls
        })
    }

    handleMouseEnterClass(cls) {
        this.setState({
            highlightedChromosome: null,
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

    handleSelectChromosome(e, chr) {
        this.setState({
            selectedChromosome: chr,
            selectedClass: null
        })
        e.stopPropagation();
    }

    handleMouseEnterChromosome(chr) {
        this.setState({
            highlightedChromosome: chr,
            highlightedDisease: null,
            highlightedClass: null
        })
    }

    handleMouseLeaveChromosome(chr) {
        if (this.state.highlightedChromosome === chr) {
            this.setState({
                highlightedChromosome: null
            });
        }
    }

    render() {
        const chromosomes = [];
        CHROMOSOMES.forEach(chromosome => {
            chromosomes.push(<Chromosome
                chromosome={chromosome}
                key={chromosome.name}
                layout={FINAL_LAYOUTS[chromosome.name]}
                onSelectChromosome={this.handleSelectChromosome.bind(this)}
                onMouseEnterChromosome={this.handleMouseEnterChromosome.bind(this)}
                onMouseLeaveChromosome={this.handleMouseLeaveChromosome.bind(this)}
            />);
        });
        const diseases = [];
        for (let className in DISEASE_CLASSES) {
            diseases.push(<DiseaseClass
                className={className}
                key={sanitizeName(className)}
                layout={FINAL_LAYOUTS["DC_" + className]}
            />);
        }

        const diseaseGenes = DISEASEOME.map(
            disease => {
                if (this.state.highlightedDisease &&
                    this.state.highlightedDisease.name === disease.name) {
                    return <DiseaseGenes
                        disease={disease}
                        key={sanitizeName(disease.name)}
                        layouts={FINAL_LAYOUTS}
                        selectedChromosome={this.state.selectedChromosome}
                    />;
                } else {
                    return null;
                }
            });

        return (
            <div className="App" style={{display: "flex", height: "100%", width: "100%", position: "fixed"}}>
                <Header />
                <div className="diseasePane" key="diseaseList">
                    <DiseaseList
                        highlightedDisease={this.state.highlightedDisease}
                        highlightedClass={this.state.highlightedClass}
                        selectedClass={this.state.selectedClass}
                        selectedChromosome={this.state.selectedChromosome}
                        handleSelectClass={this.handleSelectClass.bind(this)}
                        handleMouseEnterClass={this.handleMouseEnterClass.bind(this)}
                        handleMouseLeaveClass={this.handleMouseLeaveClass.bind(this)}
                        handleMouseEnterDisease={this.handleMouseEnterDisease.bind(this)}
                        handleMouseLeaveDisease={this.handleMouseLeaveDisease.bind(this)}
                        onSelectChromosome={this.handleSelectChromosome.bind(this)}
                    />
                </div>
                <svg
                    key="svg"
                    onClick={(e) => this.handleSelectChromosome(e, null)}
                    style={{height: "100%", margin: "auto"}}
                    viewBox="0 0 800 760"
                >
                    <g id="chromosomes">
                        {chromosomes}
                    </g>
                    <g id="disease-groups">
                        {diseases}
                    </g>
                    <g id="disease-genes">
                        {diseaseGenes}
                    </g>
                </svg>
            </div>
        );
    }

    componentDidUpdate() {
        while (CSSSheet.cssRules.length > 0) {
            if (CSSSheet.deleteRule) {
                CSSSheet.deleteRule(0);
            } else {
                CSSSheet.removeRule(0);
            }
        }

        if (this.state.highlightedDisease) {
            const name = sanitizeName(this.state.highlightedDisease.name);
            window.setTimeout(() => {
                CSSSheet.insertRule(
                    "g#DIS_" + name + " path "
                    + "{ opacity: 0.9; stroke: rgba(0, 0, 0, 0); stroke-width: 20px; }",
                    0);
            }, 10);

        }

        if (this.state.highlightedClass || this.state.selectedClass) {
            CSSSheet.insertRule("g#disease-groups path { opacity: 0.1; }", 0);

            CSSSheet.insertRule(
                "g#DGRP_" + sanitizeName(this.state.highlightedClass || this.state.selectedClass) + " path "
                + "{ opacity: 1.0;  }",
                1);
        }

        if (this.state.selectedChromosome) {
            CSSSheet.insertRule("g#chromosomes path { opacity: 0.1; }", 0);

            CSSSheet.insertRule(
                "g#CHR_" + this.state.selectedChromosome + " path "
                + "{ opacity: 1.0;  }",
                1);
                
        } else if (this.state.highlightedChromosome) {
            CSSSheet.insertRule("g#CHR_" + this.state.highlightedChromosome + " path "
                + "{ stroke: rgba(0, 0, 0, 0.4); stroke-width: 2px; }",
                0);
        }
    }
}

export default App;
