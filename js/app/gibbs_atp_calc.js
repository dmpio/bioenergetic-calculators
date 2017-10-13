//-------------------------------------------------------------------//
//-------------------------CONSTANTS---------------------------------//
//-------------------------------------------------------------------//

// Eq., Acid, and Mg-Binding Constants at T=25°C, I=0
//---------------------------------------------------//
/*  Format
        kref = Kref @ T=25°C, I=0; 
        dH = ΔH° (kJ/mol) @ T=25°C, I=0;
        prod = array of product charges (abs. val.);
        react = array of reactant charges (abs. val.);
        name =  string for associative use
 */
// ATP Acid Diss. Const.
var is0_Ka_atp = {
    kref: 2.512e-08,
    dH: -6.30,
    prod: [1, 4],
    react: [3],
    name: 'Ka_atp'
};
// ATP Mg Bind. Const.
var is0_Kb_mg_atp = {
    kref: 1.514e+06,
    dH: 22.90,
    prod: [null],
    react: [4],
    name: 'Kb_mg_atp'
};

// Protonated ATP Mg Bind. Const.
var is0_Kb_mg_hatp = {
    kref: 4.266e+03,
    dH: 16.90,
    prod: [1],
    react: [2, 3],
    name: 'Kb_mg_hatp'
};

// ADP Acid Diss. Const.
var is0_Ka_adp = {
    kref: 6.607e-08,
    dH: -5.60,
    prod: [1, 3],
    react: [2],
    name: 'Ka_adp'
};

// ADP Mg Bind. Const.
var is0_Kb_mg_adp = {
    kref: 4.466e+04,
    dH: 19,
    prod: [1],
    react: [2, 3],
    name: 'Kb_mg_adp'
};

// Protonated ADP Mg Bind. Const. 
var is0_Kb_mg_hadp = {
    kref: 3.163e+02,
    dH: 12.50,
    prod: [null],
    react: [2, 2],
    name: 'Kb_mg_hadp'
};

// Phosphocreatine Acid Diss. Const.
var is0_Ka_pcr = {
    kref: 8.854e-06,
    dH: 2.66,
    prod: [2],
    react: [null],
    name: 'Ka_pcr'
};

// Phosphocreatine Mg Bind. Const.
var is0_Kb_mg_pcr = {
    kref: 2.320e+02,
    dH: 8.19,
    prod: [null],
    react: [2, 2],
    name: 'Kb_mg_pcr'
};

// Phosphate Acid Diss. Const.
var is0_Ka_pho = {
    kref: 6.026e-8,
    dH: 12.2,
    prod: [2],
    react: [null],
    name: 'Ka_pho'
};

// Phosphate Mg Bind. Const. 
var is0_Kb_mg_pho = {
    kref: 5.128e+02,
    dH: 8.19,
    prod: [null],
    react: [2, 2],
    name: 'Kb_mg_pho'
};

// Creatine Kinase
var is0_Kref_CK = {
    kref: 2.580461e+08,
    dH: -17.55,
    prod: [4],
    react: [1, 2, 3],
    name: 'Keq_CK'
};

// ATP hydrolysis
var is0_Kref_atpHyd = {
    kref: 2.946e-1,
    dH: -20.50,
    prod: [3, 2, 1],
    react: [4],
    name: 'Keq_atpHyd'
};

//-------------------OTHER---------------------------//

//Ideal Gas Const. in J/K•mol
var const_R = 8.3144598
    
// Math.E is the base of natural logs, ~2.718

// Constants used to calculate the Keq of Creatine Kinase at new Temp and I.S.
var is0_CK_constants = {is0_Ka_atp, is0_Kb_mg_atp, is0_Kb_mg_hatp, 
                        is0_Ka_adp, is0_Kb_mg_adp, is0_Kb_mg_hadp,
                        is0_Ka_pcr, is0_Kb_mg_pcr};

// Make the object a map as it will be iterated through 
var is0_CK_constants = new Map(Object.entries(is0_CK_constants));

// Constants used to calculate the Keq of ATP hydrolysis at new Temp and I.S.
var is0_ATP_constants = {is0_Ka_atp, is0_Kb_mg_atp, is0_Kb_mg_hatp, 
                         is0_Ka_adp, is0_Kb_mg_adp, is0_Kb_mg_hadp,
                         is0_Ka_pho, is0_Kb_mg_pho};

// Make the object a map as it will be iterated through 
var is0_ATP_constants = new Map(Object.entries(is0_ATP_constants));
//-------------------------------------------------------------------//

function solve_gamma(products, reactants, temp, ionic_strength) {
    /* 
    products = array of all charged product ions
    reactants = array of all charged reactant ions
    temp = temperature in Kelvins
    ionic_strength = ionic strength in Molarity */ 
    
    // Function to solve for Γ
    // Debye–Hückel
    
    var Am = 3*(-16.39023 + (261.3371/temp) + 3.3689633*Math.log(temp) - 
                1.437167*(temp/100) + 0.111995*Math.pow((temp/100), 2));
    
    // constant with units of kg**1/2 mol**-1/2
    var B = 1.6
    
    // reactants = list of the charge carried by each reactant ionic species
    var reactant_gammas = [];
    
    // If there isn't a charged species, pass in null to ensure the returned value divides by 1
    if(reactants[0] === null) {
        reactant_gammas = [1];
    } else {
        for (var i=0; i < Object.keys(reactants).length; i++) {
            var power = -Am * Math.sqrt(ionic_strength) * Math.pow(reactants[i], 2) / (1 + B * Math.sqrt(ionic_strength));
            reactant_gammas.push(Math.pow(Math.E, power));
        }
    }
    
    // products = list of the charge carried by each product ionic species
    var product_gammas = [];
    
    // If there isn't a charged species, pass in null to ensure the returned value divides by 1
    if(products[0] === null) {
        product_gammas = [1];
    } else {
        for (var i=0; i < Object.keys(products).length; i++) {
            var power = -Am * Math.sqrt(ionic_strength) * Math.pow(products[i], 2) / (1 + B * Math.sqrt(ionic_strength));
            product_gammas.push(Math.pow(Math.E, power));
        }
    }
    
    return product_gammas.reduce(function(a,b){return a*b;})/reactant_gammas.reduce(function(a,b){return a*b;});
};

function vant_hoff(temp1, temp2, Kref1, dH) {
    /*
    temp1 = temperature for constant Kref1 (Kelvins)
    Kref1 = constant at temp1 and ionic strength 0 (the original constant from which Kref2 will be adjusted from and returned)
    temp2 = temperature for constant Kref2 (the new temperature to which Kref1 is to be adjusted)(Kelvins)
    dH = ΔH° associated with Kref1 at temp1 and ionic strength 0 (in kilojoules)
    
    return: modified constant at ionic strength 0 temp2
    */
    // Multiply dH by 1000 to convert from kJ to J
    return Math.pow(Math.E, (-1000*dH/const_R)*(1/temp2 - 1/temp1) + Math.log(Kref1));
};


function calcATPHyd(ionicStrength, temp25, tempK, ATP_krefs, proton, freeMg) {
            
    // A temporary map to hold the modified acid and Mg-binding Krefs
    var new_Kabs = new Map();
    
    // iterate through the acid and Mg-binding Krefs in the CK Eq reaction
    for(var [key, value] of is0_ATP_constants) {
        
        // new kref adjusted from I=0, T=25°C to I=0, T=tempK
        var kref2 = vant_hoff(temp25, tempK, value.kref, value.dH);
        
        // new kref adjusted from I=0, T=25°C to I=i.s. of the step, T=tempK
        var kref3 = kref2/solve_gamma(value.prod, value.react, tempK, ionicStrength);
        
        new_Kabs.set(value.name, kref3);
    };
        
    // Assembling the modified constants into the equilibrium reaction

    var eq_num_adp = 1 + (proton/new_Kabs.get('Ka_adp')) + (new_Kabs.get('Kb_mg_adp')*freeMg) + (new_Kabs.get('Kb_mg_hadp')*proton*freeMg/new_Kabs.get('Ka_adp'));
    var eq_num_pho = 1 + (proton/new_Kabs.get('Ka_pho')) + (new_Kabs.get('Kb_mg_pho')*freeMg);
    var eq_den_atp = 1 + (proton/new_Kabs.get('Ka_atp')) + (new_Kabs.get('Kb_mg_atp')*freeMg) + (new_Kabs.get('Kb_mg_hatp')*proton*freeMg/new_Kabs.get('Ka_atp'));
    
    return (ATP_krefs * eq_num_adp * eq_num_pho) / (proton * eq_den_atp);
};

function startCalc(param){
        
    // Temp of all reference constants
    var temp25 = 25 + 273.15;
    
    // New Temp for calculation
    var tempK = param.tempC*1 + 273.15;
    
    // Concentration of H+ ions
    var proton = Math.pow(10, -param.pH*1);
    
    // Phosphate conc. (M)
    var phosphate = param.phosphate/1000;
    
    // Ionic Strength in Molarity
    var ionicStrength = param.bfrIS/1000;
        
    // Free Mg in Molarity
    
    var freeMg = param.mg/1000;
    
    // ATP Conc. (M)
    var atp = param.atp_in/1000;
    
    // ADP Conc. (M)
    var adp = param.adp_in/1000;
    
    
    //**************ATP Hydrolysis Steps************************//
    
    // Adjust the Kref of CK @ I=0, T=25°C to tempK
    var Kref_ATP_newT_is0 = vant_hoff(temp25, tempK, is0_Kref_atpHyd.kref, is0_Kref_atpHyd.dH);
    
    // Adjust the Kref of ATP @ I=0, T=tempK to Ionic Strength
    
    var Kref_ATP_adj = Kref_ATP_newT_is0/solve_gamma(is0_Kref_atpHyd.prod, is0_Kref_atpHyd.react, tempK, ionicStrength)
    
        
    /* Adjust the Kb and Ka values of the ATP Hydrolysis eq. reaction 
       and multiply them by the adjusted ATP Hydrolysis Krefs to calculate
       the ATP Hydrolysis Keq at each step in the titration
    */
    // The Modified ATP Hydrolysis Eq. Constant
    var Keq_ATP = calcATPHyd(ionicStrength, temp25, tempK, Kref_ATP_adj, proton, freeMg);
    
    // The ΔG°' of ATP hydrolysis 
    var dG_ATP_keq = -1*const_R*tempK*Math.log(Keq_ATP);
    
       
    // The ΔG' of ATP hydrolysis
    var dG_ATP = dG_ATP_keq*1 + const_R*tempK*Math.log((adp * phosphate)/atp);
    
    generate_output(dG_ATP, dG_ATP_keq, Keq_ATP);
};