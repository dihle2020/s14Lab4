/**
 * @class Donut
 */
class Donut {

    // Vars
    data_angles = [];
    data_ready=[];
    arc =[];
    arcs=[];
    pie='';
    // Elements
    svg = null;
    g = null;
    xAxisG = null;
    yAxisG = null;

    color =[];

    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = {top: 50, right: 25, bottom: 75, left: 75};
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);

    radius =Math.min(this.svgW,this.svgH)/2-this.gMargin

    scX = d3.scaleLinear()
            .range([0, this.gW]);
    scY = d3.scaleLinear()
            .range([this.gH, 0]);
    scR = d3.scaleLinear()
            .range([0, .1]);


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

        // Append pie g
        vis.pieG = vis.g.append('g')
            .attr('class', 'pieG')
            .style('transform', `translate(${vis.gW / 2}px, ${vis.gH / 2}px)`);

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
        var languages = ["java","other","py","cpp","php","js"];
        var angle_map = vis.data.map(d => d.prog_lang);
        var javaCount = 0;
        var otherCount = 0;
        var pyCount = 0;
        var cppCount = 0;
        var phpCount = 0;
        var jsCount = 0;


        for (var x in angle_map){
            console.log(angle_map[x])
            if (angle_map[x]=== "java"){javaCount++;}
            else if (angle_map[x]==="other"){otherCount++;}
            else if (angle_map[x]==="py"){pyCount++;}
            else if (angle_map[x]==="cpp"){cppCount++;}
            else if (angle_map[x]==="php"){phpCount++;}
            else if (angle_map[x]==="js"){jsCount++;}

        }

        var lang_counts = {}
        lang_counts["javaUsers"]=javaCount;
        lang_counts["otherUsers"]=otherCount;
        lang_counts["pyUsers"]=pyCount;
        lang_counts["cppUsers"]=cppCount;
        lang_counts["phpUsers"]=phpCount;
        lang_counts["jsUsers"]=jsCount;
        console.log(lang_counts)

         // Get displayData
        vis.displayData = d3.nest()
            .key(d => d.prog_lang)
            .rollup(d => d.length)
            .entries(vis.data);
        console.log(vis.displayData)

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

        var radius =Math.min(vis.svgW,vis.svgH)/2-vis.gMargin;


          // Generate the arcs
        vis.arc = d3.arc()
            .outerRadius(70);
        vis.pie = d3.pie();

        var arcs = vis.pie(vis.data_ready)

        var allColors = ['#DF3054', '#FF8E00', '#FFBD1D', '#EBE2B2', '#7DC3E6', '#7DC3E6', '#008CC8', '#00508E',
      /* other colors */ '#8E26C9', '#E5E6ED', '#777980', '#F8E71C'];
        var color = d3.scaleOrdinal()
	        .range(allColors);







    }
}