// Calculate ionic strength of a given salt
function calcIS(salt_conc, cation_stoich, cation_charge, anion_stoich, anion_charge){
    return (salt_conc*cation_stoich*Math.pow(cation_charge, 2) + salt_conc*anion_stoich*Math.pow(anion_charge, 2))/2 
}

// Calculate the ionic strengths for each step of the PCr titration
function calcTableIS(){
    /*  Salt Variables for calculating Ionic Strength
        Note: signs are omitted as the charges are squared
    */
    // Phosphocreatine
    pcr_stoich = 1
    pcr_charge = 2

    // ATP
    atp_stoich = 1
    atp_charge = 4

    // Common Cation 
    /*  Cations of Tris, Sodium, and Potassium are the only commercially available PCr and ATP salts known to the author. 
        They carry the same charge and stoichiometry
    */
    cat_stoich = 2
    cat_charge = 1
    
    $bfrIS = $("input[id ='bfrIS']");
    $conc = $("input[id ^='conc']");
    $is = $("input[id ^='is']");
    
    // Calc. the basal ionic strength of buffer + basal PCr 
    $is[0]['value'] = $bfrIS.val()*1 + calcIS($conc[0]['value'], cat_stoich, cat_charge, pcr_stoich, pcr_charge)*1
    
    // Calc. the ionic strength after ATP addition
    $is[1]['value'] = $is[0]['value']*1 + calcIS($conc[1]['value'], cat_stoich, cat_charge, atp_stoich, atp_charge)*1
    
    // Calc. ionic strength of remaining PCr additions
    for (i = 2; i < $is.length; i++){
        $is[i]['value'] = $is[i*1-1]['value']*1 + calcIS($conc[i]['value'], cat_stoich, cat_charge, pcr_stoich, pcr_charge)*1
    }
}
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

function calcStepOneConc(Keq_CK, ATP, Cr, PCr) {
    /*
    This solves the concentrations of ATP, ADP, Cr, and PCr
    after the first step in the titration. Prior to this step, the buffer contains 
    Creatine Kinase, Creatine, and Phosphocreatine. After the ATP is added, the 
    equilibrium produces ADP and PCr at the expense of ATP and Creatine.
    
    
    The function solves the following equilibrium for x
    [ATP - x][Cr - x]
    ----------------- = Keq_CK
    [ADP + x][PCr + x]
    
    This equilibrium can be rearranged to the following quadratic formula
    (Keq_CK - 1)x^2 + (Keq_CK*PCr + ATP + Cr)x - ATP*Cr = 0
    
    Inputs:
    Keq_CK = the equilibirum constant of Creatine Kinase at the specific I and T
    ATP = the concentration of ATP added the instant before CK converts it 
    Cr = the concentration of Creatine in the buffer before the addition of ATP
    PCr = the concentration of Phosphocreatine in the buffer before the addition of ATP
    
    ADP is assumed to be 0
    
    Returns object with new concentrations
    */
    
    var a = (Keq_CK - 1);
    var b = (Keq_CK*PCr + ATP + Cr);
    var c = -ATP*Cr;
    var x = (-1*b + Math.sqrt((b*b) - 4*(a*c))) / (2*a);
    
    return {
        ATP: ATP-x,
        Cr: Cr-x,
        ADP: x,
        PCr: PCr+x
    };
};

function calcStepConc(Keq_CK, ATP, Cr, ADP, PCr_pre, PCr_add) {
    /*
    
    This solves the concentrations of ATP, ADP, Cr, and PCr
    for all steps in the titration except the first (where ATP is added)
    
    The function solves the following equilibrium for x
    [ATP + x][Cr + x]
    ----------------- = Keq_CK
    [ADP - x][PCr_pre + (Pcr_add - x)]
    
    This equilibrium can be rearranged to the following quadratic formula
    (Keq_CK - 1)x^2 - [Keq_CK(ADP - PCr_pre - PCr_add) - ATP - Cr]x + [Keq_CK*ADP*PCr_pre + Keq_CK*ADP*PCr_add - ATP*Cr] = 0
    
    Inputs:
    Keq_CK = the equilibirum constant of Creatine Kinase at the specific I and T
    ATP = the concentration of ATP in the buffer before the addition of PCr
    Cr = the concentration of Creatine in the buffer before the addition of PCr
    PCr_pre = the concentration of Phosphocreatine in the buffer before the addition of PCr_add
    PCr_add = the concentration of Phosphocreatine added the instant before CK converts it
    
    Returns object with new concentrations
    
    */
    
    var a = (Keq_CK - 1);
    var b = Keq_CK*(ADP - PCr_pre - PCr_add) - ATP - Cr;
    var c = Keq_CK*ADP*PCr_pre + Keq_CK*ADP*PCr_add - ATP*Cr;
    var x = (-1*b - Math.sqrt((b*b) - 4*(a*c))) / (2*a);
    
    return {
        ATP: ATP+x,
        Cr: Cr+x,
        ADP: ADP-x,
        PCr: PCr_pre + (PCr_add - x)
    };
};

function calcCK_Keq_steps(ionicStrengths, temp25, tempK, CK_krefs, proton, freeMg) {
    // an array to store the modified equilibrium constants at each step in the titration
    var Keq_CK = [];
    // iterate through each ionic strenght of the CK Clamp
    for (var i=0; i<ionicStrengths.length; i++) {
        // A temporary map to hold the modified acid and Mg-binding Krefs
        var new_Kabs = new Map();
        
        // iterate through the acid and Mg-binding Krefs in the CK Eq reaction
        for(var [key, value] of is0_CK_constants) {
            
            // new kref adjusted from I=0, T=25°C to I=0, T=tempK
            var kref2 = vant_hoff(temp25, tempK, value.kref, value.dH);
            
            // new kref adjusted from I=0, T=25°C to I=i.s. of the step, T=tempK
            var kref3 = kref2/solve_gamma(value.prod, value.react, tempK, ionicStrengths[i]);
            
            new_Kabs.set(value.name, kref3);
        };
        
        // Assembling the modified constants into the equilibrium reaction
        var eq_num_atp = 1 + (proton/new_Kabs.get('Ka_atp')) + (new_Kabs.get('Kb_mg_atp')*freeMg[i]) + (new_Kabs.get('Kb_mg_hatp')*proton*freeMg[i]/new_Kabs.get('Ka_atp'));
        var eq_den_adp = 1 + (proton/new_Kabs.get('Ka_adp')) + (new_Kabs.get('Kb_mg_adp')*freeMg[i]) + (new_Kabs.get('Kb_mg_hadp')*proton*freeMg[i]/new_Kabs.get('Ka_adp'));
        var eq_den_pcr = 1 + (proton/new_Kabs.get('Ka_pcr')) + (new_Kabs.get('Kb_mg_pcr')*freeMg[i]);
        
        Keq_CK.push((CK_krefs[i] * proton * eq_num_atp) / (eq_den_adp * eq_den_pcr));
    };
    
    return Keq_CK;
};

function calcATPHyd_steps(ionicStrengths, temp25, tempK, ATP_krefs, proton, freeMg) {
    // an array to store the modified equilibrium constants at each step in the titration
    var Keq_ATP = [];
    // iterate through each ionic strenght of the CK Clamp
    for (var i=0; i<ionicStrengths.length; i++) {
        // A temporary map to hold the modified acid and Mg-binding Krefs
        var new_Kabs = new Map();
        
        // iterate through the acid and Mg-binding Krefs in the CK Eq reaction
        for(var [key, value] of is0_ATP_constants) {
            
            // new kref adjusted from I=0, T=25°C to I=0, T=tempK
            var kref2 = vant_hoff(temp25, tempK, value.kref, value.dH);
            
            // new kref adjusted from I=0, T=25°C to I=i.s. of the step, T=tempK
            var kref3 = kref2/solve_gamma(value.prod, value.react, tempK, ionicStrengths[i]);
            
            new_Kabs.set(value.name, kref3);
        };
        
        // Assembling the modified constants into the equilibrium reaction

        var eq_num_adp = 1 + (proton/new_Kabs.get('Ka_adp')) + (new_Kabs.get('Kb_mg_adp')*freeMg[i]) + (new_Kabs.get('Kb_mg_hadp')*proton*freeMg[i]/new_Kabs.get('Ka_adp'));
        var eq_num_pho = 1 + (proton/new_Kabs.get('Ka_pho')) + (new_Kabs.get('Kb_mg_pho')*freeMg[i]);
        var eq_den_atp = 1 + (proton/new_Kabs.get('Ka_atp')) + (new_Kabs.get('Kb_mg_atp')*freeMg[i]) + (new_Kabs.get('Kb_mg_hatp')*proton*freeMg[i]/new_Kabs.get('Ka_atp'));
        
        Keq_ATP.push((ATP_krefs[i] * eq_num_adp * eq_num_pho) / (proton * eq_den_atp));
    };
    
    return Keq_ATP;
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
    var ionicStrengths = [];
    // the first ionic strength in the table isn't really needed, so it is skipped
    for (var i=1; i<param.stepCount; i++) {
        ionicStrengths.push(param["is"+i]/1000);
    }
    
    // Free Mg in Molarity
    // the first free Mg in the table isn't really needed, so it is skipped
    var freeMg = [];
    for (var i=1; i<param.stepCount; i++) {
        freeMg.push(param["mg"+i]/1000);
    }
    
    // Added ATP Conc. (M)
    var atp = param.atp/1000;
    
    // Creatine conc. (M)
    creatine = param.creatine/1000;
    
    // Phosphocreatine conc. (M)
    var PCrs = [];
    for (var i=0; i<param.stepCount-1; i++) {
        PCrs.push(param["pcr"+i]/1000);
    }
    
    //**************Creatine Kinase Steps************************//
    
    // Adjust the Kref of CK @ I=0, T=25°C to tempK
    var Kref_CK_newT_is0 = vant_hoff(temp25, tempK, is0_Kref_CK.kref, is0_Kref_CK.dH);
    
    // Adjust the Kref of CK @ I=0, T=tempK to Ionic Strengths over the clamp
    // An array to store the CK Kref values at tempK and ionic strengths of the clamp
    var Arr_Kref_CK_adj = [];
    
    for (var i=0; i<ionicStrengths.length; i++) {        
        Arr_Kref_CK_adj.push(Kref_CK_newT_is0/solve_gamma(is0_Kref_CK.prod, is0_Kref_CK.react, tempK, ionicStrengths[i]));
    };
    
    /* Adjust the Kb and Ka values of the CK eq. reaction 
       and multiply them by the adjusted CK Krefs to calculate
       the CK Keq at each step in the titration
    */
    // An array containing the Modified CK Eq. Constants for each step in the titration
    var Keq_CK = calcCK_Keq_steps(ionicStrengths, temp25, tempK, Arr_Kref_CK_adj, proton, freeMg);
    
    
    //***Calculate the concentration of ATP and ADP at each step in the titration***//
    // array to store the objects with each step's concentrations
    var CK_concentrations = [];
    
    // Eq. Concentrations after adding ATP
    CK_concentrations.push(calcStepOneConc(Keq_CK[0], atp, creatine, PCrs[0]));
    
    for (var i=1; i<param.stepCount-1; i++) {
        CK_concentrations.push(
            calcStepConc(
                Keq_CK[i],
                CK_concentrations[i-1].ATP,
                CK_concentrations[i-1].Cr,
                CK_concentrations[i-1].ADP,
                CK_concentrations[i-1].PCr,
                PCrs[i]
            )
        );
    };

    //**************ATP Hydrolysis Steps************************//
    
    // Adjust the Kref of ATP @ I=0, T=25°C to tempK
    var Kref_ATP_newT_is0 = vant_hoff(temp25, tempK, is0_Kref_atpHyd.kref, is0_Kref_atpHyd.dH);
    
    // Adjust the Kref of ATP @ I=0, T=tempK to Ionic Strengths over the clamp
    // An array to store the CK Kref values at tempK and ionic strengths of the clamp
    var Arr_Kref_ATP_adj = [];
    
    for (var i=0; i<ionicStrengths.length; i++) {        
        Arr_Kref_ATP_adj.push(Kref_ATP_newT_is0/solve_gamma(is0_Kref_atpHyd.prod, is0_Kref_atpHyd.react, tempK, ionicStrengths[i]));
    };
    
    /* Adjust the Kb and Ka values of the ATP eq. reaction 
       and multiply them by the adjusted ATP Krefs to calculate
       the ATP Keq at each step in the titration
    */
    // An array containing the Modified ATP Hydrolysis Eq. Constants for each step in the titration
    var Keq_ATP = calcATPHyd_steps(ionicStrengths, temp25, tempK, Arr_Kref_ATP_adj, proton, freeMg);
    
    // An array containing the ΔG°' of ATP hydrolysis for each step in the titration 
    var dG_ATP_keq = [];
    
    for (var i=0; i<Keq_ATP.length; i++) {
        dG_ATP_keq.push(-1*const_R*tempK*Math.log(Keq_ATP[i]));
    };
    
    // An Array containing the ΔG' of ATP hydrolysis for each step in the titration
    var dG_ATP = []
    for (var i=0; i<CK_concentrations.length; i++) {
        dG_ATP.push(dG_ATP_keq[i] + const_R*tempK*Math.log((CK_concentrations[i].ADP * phosphate)/CK_concentrations[i].ATP));
    };
    
    generate_output(param.stepCount, dG_ATP, dG_ATP_keq, Keq_ATP, Keq_CK, CK_concentrations);
};