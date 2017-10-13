$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    new Clipboard('.btn');
    $('#topForm').bootstrapValidator({
        fields: {
            tempC: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    lessThan: {
                        value: 150,
                        inclusive: true,
                        message: 'Must be ≤ 150°C'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: true,
                        message: 'Must be ≥ 0°C'
                    }
                }
            },
            pH: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    lessThan: {
                        value: 9,
                        inclusive: true,
                        message: 'Must be ≤ 9'
                    },
                    greaterThan: {
                        value: 5,
                        inclusive: true,
                        message: 'Must be ≥ 5'
                    }
                }                
            },
            bfrIS: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 10,
                        inclusive: true,
                        message: 'Must be ≥ 10 mM'
                    }
                }                
            },
            atp_in: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: 'Required'
                    }
                }                
            },
            adp_in: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: 'Required'
                    }
                }                
            },
            phosphate: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: 'Required'
                    }
                }                
            },
            mg: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: 'Required'
                    }
                }                
            }
        }
    });
});

function bv_validate(){
    var topForm_validation = $('#topForm').data('bootstrapValidator').validate();
    
    if (topForm_validation.$invalidFields.length > 0){
        console.log('invalid form');
        return
    } else {
        returnArray = {};
        topFormArray = $('#topForm').serializeArray();
        
        for (var i = 0; i < topFormArray.length; i++){
            returnArray[topFormArray[i]['name']] = topFormArray[i]['value'];
        }

        startCalc(returnArray);
    }
}
function generate_output(dG_ATP, dG_ATP_keq, Keq_ATP){
    //******Reveal the output fields******//
    $('#outputForm').show();
    
    //*******Convert the units********//
    // returns Joules
    var dGconverter = 1;
    
    if ($('#dGUnits').val() === 'J') {
        dGconverter = 1;
    }
    
    // returns kJoules
    if ($('#dGUnits').val() === 'kJ') {
        dGconverter = 1/1000;
    }
    // returns kcal
    else if ($('#dGUnits').val() === 'kCal') {
        dGconverter = 0.000239006;
    }
    
    // ΔG' ATP Hydrolysis
    $("[id ='output_dG_prime']").val((dG_ATP*dGconverter).toFixed(2));
        
    // ΔG°' ATP Hydrolysis
    $("[id ='output_dG_naught_prime']").val((dG_ATP_keq*dGconverter).toFixed(2));
    
    // Keq ATP Hydrolysis
    $("[id ='output_keq_atp']").val(Keq_ATP.toFixed(2));
    
};