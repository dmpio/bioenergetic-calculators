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
            creatine: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 1,
                        inclusive: true,
                        message: 'Must be ≥ 1 mM'
                    }
                }                
            },
            phosphate: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 1,
                        inclusive: true,
                        message: 'Must be ≥ 1 mM'
                    }
                }                
            },
        }
    });
    
    $('#tableForm').bootstrapValidator({
        group: 'td',
        fields: {
            conc0: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            conc1: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            conc2: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            is0: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            is1: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            is2: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            mg0: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            mg1: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
            mg2: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: '>0'
                    }
                }
            },
        }
    })
        
    
    // Calc. Ionic Strength on load
    calcTableIS();

    // Add rows to the titration step table
    var index = 2; 
    $("#plusStep").click(function(e){
        e.preventDefault();
        index++; 
        
        $("#titrationSteps")
            .append($('<tr>')
                .attr('id','step'+index)
                .attr('name','step'+index)
                .append($('<td>')
                    .text(index))
                .append($('<td>')
                    .text('PCr'))
                .append($('<td>')
                    .append($('<div>')
                        .attr('class', 'input-group')
                        .append($('<input>')
                            .attr('type','number')
                            .attr('id','conc'+index)
                            .attr('name','pcr'+(index-1))
                            .attr('value',3)
                            .attr('style','text-align:center;')
                            .attr('size',2)
                            .attr('class','form-control')
                            .attr('onchange', 'calcTableIS()')
                            .attr('required', 'required')
                            .attr('min', 0)
                            .attr('step', 0.01 )
                            .attr('data-bv-greaterthan-inclusive', 'false')
                            .attr('data-bv-greaterthan-message', '>0')
                            .attr('data-bv-notempty-message', 'Required')
                        )
                        .append($('<span>')
                            .attr('class', 'input-group-addon')
                            .text('[mM]')
                        )
                    )
                )    
                
                .append($('<td>')
                    .append($('<div>')
                        .attr('class', 'input-group')
                        .append($('<input>')
                            .attr('type','number')
                            .attr('id','is'+index)
                            .attr('name','is'+index)
                            .attr('value','')
                            .attr('style','text-align:center;')
                            .attr('size',2)
                            .attr('class','form-control no-spinners')
                            .attr('required', 'required')
                            .attr('min', 0)
                            .attr('step', 0.01 )
                            .attr('data-bv-greaterthan-inclusive', 'false')
                            .attr('data-bv-greaterthan-message', '>0')
                            .attr('data-bv-notempty-message', 'Required')
                        )
                        .append($('<span>')
                            .attr('class', 'input-group-addon')
                            .text('[mM]')
                        )
                    )
                )
                .append($('<td>')
                    .append($('<div>')
                        .attr('class', 'input-group')
                        .append($('<input>')
                            .attr('type','number')
                            .attr('id','mg'+index)
                            .attr('name','mg'+index)
                            .attr('value','0.5')
                            .attr('style','text-align:center;')
                            .attr('size',2)
                            .attr('class','form-control no-spinners')
                            .attr('required', 'required')
                            .attr('min', 0)
                            .attr('step', 0.0001)
                            .attr('data-bv-greaterthan-inclusive', 'false')
                            .attr('data-bv-greaterthan-message', '>0')
                            .attr('data-bv-notempty-message', 'Required')
                        )
                        .append($('<span>')
                            .attr('class', 'input-group-addon')
                            .text('[mM]')
                        )
                    )
                )
            );
        
        $('#tableForm').bootstrapValidator('addField', $('#tableForm').find('[id="conc' + index + '"]'));
        $('#tableForm').bootstrapValidator('addField', $('#tableForm').find('[name="is' + index + '"]'));
        $('#tableForm').bootstrapValidator('addField', $('#tableForm').find('[name="mg' + index + '"]'));
        
        // update the step-counter
        $("#stepCount").val(index+1);
        
        // update the ionic strength 
        calcTableIS();
        
    });
        
    // Subtract rows from the titration step table
    // Calc. Must have 3 steps
    var min = 2;
    $("#minusStep").click(function(e){
        e.preventDefault();
        if(index > min){
            // remove fields from DOM
            $("#step"+index).remove()
            
            //Remove fields from BootstrapValidator
            $('#tableForm').bootstrapValidator('removeField', $('#tableForm').find('[name="conc' + index + '"]'));
            $('#tableForm').bootstrapValidator('removeField', $('#tableForm').find('[name="is' + index + '"]'));
            $('#tableForm').bootstrapValidator('removeField', $('#tableForm').find('[name="mg' + index + '"]'));
            
            //update the index
            index--;
            
            //update the step counter
            $("#stepCount").val(index+1);
        }
    });
});

function bv_validate(){
    var topForm_validation = $('#topForm').data('bootstrapValidator').validate();
    var tableForm_validation = $('#tableForm').data('bootstrapValidator').validate();
    if (topForm_validation.$invalidFields.length > 0 || tableForm_validation.$invalidFields.length > 0){
        console.log('invalid form');
        return
    } else {
        returnArray = {};
        topFormArray = $('#topForm').serializeArray();
        tableFormArray = $('#tableForm').serializeArray();
        for (var i = 0; i < topFormArray.length; i++){
            returnArray[topFormArray[i]['name']] = topFormArray[i]['value'];
        }
        for (var i = 0; i < tableFormArray.length; i++){
            returnArray[tableFormArray[i]['name']] = tableFormArray[i]['value'];
        }
        startCalc(returnArray);
    }
}
// to disable copying buttons
jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            var $this = $(this);
            $this.toggleClass('disabled', state);
        });
    }
});
function generate_output(stepCount, dG_ATP, dG_ATP_keq, Keq_ATP, Keq_CK, CK_concentrations){
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
    
    // returns mM
    var concConverter = 1000;
    var concDec = 3;
    // returns M
    if ($('#concUnits').val() === 'M') {
        concConverter = 1;
        concDec = 6;
    }
    
    //******Format the outputs******//
    $("[id^='output']").each(function () {
        $(this).attr('rows', $("#stepCount").val());
    });
    
    // ΔG' ATP Hydrolysis
    dG_ATP = dG_ATP.map(function(num){
        return Number((num*dGconverter).toFixed(2));
    });
    $("[id ='output_dG_prime']").val(dG_ATP.join("\n").toString());
        
    // ΔG°' ATP Hydrolysis
    dG_ATP_keq = dG_ATP_keq.map(function(num){
        return Number((num*dGconverter).toFixed(2));
    });
    $("[id ='output_dG_naught_prime']").val(dG_ATP_keq.join("\n").toString());
    
    // Keq ATP Hydrolysis
    Keq_ATP = Keq_ATP.map(function(num){
        return Number(num.toFixed(2));
    });
    $("[id ='output_keq_atp']").val(Keq_ATP.join("\n").toString());
    
    // Keq CK
    Keq_CK = Keq_CK.map(function(num){
        return Number(num.toFixed(2));
    });
    $("[id ='output_keq_ck']").val(Keq_CK.join("\n").toString());
    
    // ATP
    var atp_conc = [];
    for (var i=0; i<CK_concentrations.length; i++) {
        var mm_atp = CK_concentrations[i].ATP*concConverter;
        atp_conc.push(mm_atp.toFixed(concDec));
    }
    $("[id ='output_atp']").val(atp_conc.join("\n").toString());
    
    // ADP
    var adp_conc = [];
    for (var i=0; i<CK_concentrations.length; i++) {
        var mm_adp = CK_concentrations[i].ADP*concConverter;
        adp_conc.push(mm_adp.toFixed(concDec));
    }
    $("[id ='output_adp']").val(adp_conc.join("\n").toString());
    
    // PCr
    var pcr_conc = [];
    for (var i=0; i<CK_concentrations.length; i++) {
        var mm_pcr = CK_concentrations[i].PCr*concConverter;
        pcr_conc.push(mm_pcr.toFixed(concDec));
    }
    $("[id ='output_pcr']").val(pcr_conc.join("\n").toString());
    
    // Cr
    var cr_conc = [];
    for (var i=0; i<CK_concentrations.length; i++) {
        var mm_cr = CK_concentrations[i].Cr*concConverter
        cr_conc.push(mm_cr.toFixed(concDec));
    }
    $("[id ='output_cr']").val(cr_conc.join("\n").toString());
};