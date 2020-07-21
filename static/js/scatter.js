/**
 * @class Scatter
 */
class Scatter {

    // Vars
    data_bins=[]
    yearMap = [];
    hw1Map = [];
    ageMap = [];
    scatter_data=[];

    // Elements
    svg = null;
    g = null;
    xAxisG = null;
    yAxisG = null;

    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = {top: 50, right: 25, bottom: 75, left: 75};
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);

    // Tools
    scX = d3.scaleLinear()
            .range([0, this.gW]);
    scY = d3.scaleLinear()
            .range([this.gH, 0]);
    scR = d3.scaleLinear()
            .range([0, .1]);
    histogram = d3.histogram();
    yAxis = d3.axisLeft().ticks(5);
    xAxis = d3.axisBottom();

    /*
    Constructor
     */
    constructor(_data, _target) {
        // Assign parameters as object fields
        this.data = _data;
        this.target = _target;

        // Now init
        this.init();
    }

    /** @function init()
     * Perform one-time setup function
     *
     * @returns void
     */
    init() {
        // Define this vis
        const vis = this;

        // Set up the svg/g work space
        vis.svg = d3.select(`#${vis.target}`)
            .append('svg')
            .attr('width', vis.svgW)
            .attr('height', vis.svgH);
        vis.g = vis.svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${vis.gMargin.left}px, ${vis.gMargin.top}px)`);

        // Append axes
        vis.xAxisG = vis.g.append('g')
            .attr('class', 'axis axisX')
            .style('transform', `translateY(${vis.gH + 15}px)`);
        vis.xAxisG.append('text')
            .attr('class', 'label labelX')
            .style('transform', `translate(${vis.gW / 2}px, 40px)`)
            .text('Programming Exp. (Yrs)');
        vis.yAxisG = vis.g.append('g')
            .attr('class', 'axis axisY')
            .style('transform', 'translateX(-15px)');
        vis.yAxisG.append('text')
            .attr('class', 'label labelY')
            .style('transform', `rotate(-90deg) translate(-${vis.gH / 2}px, -30px)`)
            .text('Hw1 Time Spent (Hrs)');


        // Now wrangle
        vis.wrangle();
    }

    /** @function wrangle()
     * Preps data for vis
     *
     * @returns void
     */
    wrangle() {
        // Define this vis
        const vis = this;

        // Map years of experience, hw1 hours, and age
        vis.yearMap = vis.data.map(d => d.experience_yr);
        vis.hw1Map = vis.data.map(d => d.hw1_hrs);
        vis.ageMap = vis.data.map(d => d.age);
        vis.scatter_data = [vis.yearMap, vis.hw1Map, vis.ageMap]
        // Use histogram() to place in bins
        //vis.data_bins = vis.histogram(vis.yearMap);

        // Update scales
        vis.scX.domain(d3.extent(vis.yearMap,d => d));
        vis.scY.domain([0, d3.max(vis.hw1Map,d => d)]);
        vis.xAxis.scale(vis.scX).ticks(vis.yearMap.max);
        vis.yAxis.scale(vis.scY);


        // Now render
        vis.render();
    }

    /** @function render()
     * Builds, updates, removes elements in vis
     *
     * @returns void
     */
    render() {
        // Define this vis
        const vis = this;
        vis.g.selectAll(".dots")
            .data(vis.data)
            .join(
                enter => enter
                    .append('g')
                    .attr('class','dots')
                    .each(function(d,i){
                        const g = d3.select(this)

                        // Get dims
                        const w = vis.gW / vis.data.length;
                        const h = vis.scY(d.length);

                        g.append('circle')
                            .attr("cx", function (d) { return vis.scX(d.experience_yr); })
                            .attr("cy", function (d) { return vis.scY(d.hw1_hrs); })
                            .attr("r", function (d) { return vis.scR(d.age); })
                            .attr('fill', 'rgba(0, 0, 128, 1)');
                    })

            );

        // Update axis
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);

    }
}