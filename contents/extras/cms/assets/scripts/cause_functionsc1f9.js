jQuery(document).ready(function($) {
	//$('.bg_color').wpColorPicker();
	/*jQuery("#date").datetimepicker({
		format: 'd.m.Y H:i'

	});*/
});
/**
* Toggle Function
*/
function cs_toggle(id) {
	jQuery("#" + id).slideToggle("slow");
}

/**
* Update Title
*/
function update_title(id) {
	var val;
	val = jQuery('#address_name' + id).val();
	jQuery('#address_name' + id).html(val);
}

/**
* Delete Confirm Html popup
*/
var html_popup = "<div id='confirmOverlay' style='display:block'> \
								<div id='confirmBox'><div id='confirmText'>Are you sure to do this?</div> \
								<div id='confirmButtons'><div class='button confirm-yes'>Delete</div>\
								<div class='button confirm-no'>Cancel</div><br class='clear'></div></div></div>"
								

/**
* Delete Item
*/
jQuery(".btndeleteit").live("click", function() {
	
	jQuery(this).parents(".parentdelete").addClass("warning");
	jQuery(this).parent().append(html_popup);

	jQuery(".confirm-yes").click(function() {
		jQuery(this).parents(".parentdelete").fadeOut(400, function() {
			jQuery(this).remove();
		});
		
		jQuery(this).parents(".parentdelete").each(function(){
			var lengthitem = jQuery(this).parents(".dragarea").find(".parentdelete").size() - 1;
			jQuery(this).parents(".dragarea").find("input.textfld") .val(lengthitem);
		});

		jQuery("#confirmOverlay").remove();
		//count_widget--;
		//if (count_widget == 0) jQuery("#add_page_builder_item").removeClass("hasclass");
	
	});
	jQuery(".confirm-no").click(function() {
		jQuery(this).parents(".parentdelete").removeClass("warning");
		jQuery("#confirmOverlay").remove();
	});
	
	return false;
});

/**
* Create Popup
*/
function _createpop(data, type) {
	var _structure = "<div id='cs-pbwp-outerlay'><div id='cs-widgets-list'></div></div>",
		$elem = jQuery('#cs-widgets-list');
	jQuery('body').addClass("cs-overflow");
	if (type == "csmedia") {
		$elem.append(data);
	}
	if (type == "filter") {
		jQuery('#' + data).wrap(_structure).delay(100).fadeIn(150);
		jQuery('#' + data).parent().addClass("wide-width");
	}
	if (type == "filterdrag") {
		jQuery('#' + data).wrap(_structure).delay(100).fadeIn(150);
	}

}

/**
* Remove Popup
*/
function removeoverlay(id, text) {
	jQuery("#cs-widgets-list .loader").remove();
	var _elem1 = "<div id='cs-pbwp-outerlay'></div>",
		_elem2 = "<div id='cs-widgets-list'></div>";
	$elem = jQuery("#" + id);
	jQuery("#cs-widgets-list").unwrap(_elem1);
	if (text == "append" || text == "filterdrag") {
		$elem.hide().unwrap(_elem2);
	}
	if (text == "widgetitem") {
		$elem.hide().unwrap(_elem2);
		jQuery("body").append("<div id='cs-pbwp-outerlay'><div id='cs-widgets-list'></div></div>");
		return false;

	}
	if (text == "ajax-drag") {
		jQuery("#cs-widgets-list").remove();
	}
	jQuery("body").removeClass("cs-overflow");
}

/**
* Open Popup
*/
function openpopedup(id) {
	var $ = jQuery;
	$(".elementhidden,.opt-head,.to-table thead,.to-table tr").hide();
	$("#" + id).parents("tr").show();
	$("#" + id).parents("td").css("width", "100%");
	$("#" + id).parents("td").prev().hide();
	$("#" + id).parents("td").find("a.actions").hide();
	$("#" + id).children(".opt-head").show();
	$("#" + id).slideDown();

	$("#" + id).animate({
		top: 0,
	}, 400, function() {
		// Animation complete.
	});
	/*$.scrollTo('#normal-sortables', 800, {
		easing: 'swing'
	});*/
};

/**
* close Popup
*/ 
function closepopedup(id) {
	var $ = jQuery;
	$("#" + id).slideUp(800);

	$(".to-table tr").css("width", "");
	$(".elementhidden,.opt-head,.option-sec,.to-table thead,.to-table tr,a.actions,.to-table tr td").delay(600).fadeIn(200);

	$.scrollTo('.elementhidden', 800, {
		
	});
};


/**
 * Cause Last Miles Toggle
 */ 
function cs_toggle_cause_last_miles(id, counter){
	if ( id == 'cause-last-miles'){
		jQuery("#port_last"+counter).show();
	} else {
		jQuery("#port_last"+counter).hide();
	}
}

/**
 * Add Cause Donors to List
 */ 
 var counter_donation = 0;
 function add_cause_donation_to_list(admin_url, theme_url){
	counter_donation++;
	//cause-other-options
	jQuery("#cause_other_options").hide();
	var dataString = 'counter_donation=' + counter_donation + 
					'&user_id=' + jQuery("#user_id").val() +
					'&address_name=' + jQuery("#address_name").val() +
					'&payer_email=' + jQuery("#payer_email").val() +
					'&payment_gross=' + jQuery("#payment_gross").val() +
					'&txn_id=' + jQuery("#txn_id").val() +
					'&payment_date=' + jQuery("#payment_date").val() +
					'&action=add_cause_donation_to_list';
	jQuery("#loading").html("<img src='"+theme_url+"/images/admin/ajax_loading.gif' />");
	jQuery.ajax({
		type:"POST",
		url: admin_url,
		data: dataString,
		success:function(response){
			jQuery("#total_cause_donations").append(response);
			jQuery("#loading").html("");
			removeoverlay('add_cuase_dontations', 'append');
			jQuery("#address_name").val("Title");
			//jQuery("#cause_other_options").show();
				//jQuery("#ingredient_other").val("");
		}
	});
	//return false;
}

/**
 * Map Tab Resize
 */ 
jQuery('#tab-location-settings-cs-events').bind('tabsshow', function(event, ui) {
    if (ui.panel.id == "map-tab") {
        resizeMap();
    }
});

/**
* Map Location Resize
*/ 
jQuery(document).ready(function() {
	jQuery('a[href="#tab-location-settings-cs-events"]').click(function (e){
		var map = jQuery("#cs-map-location-id")[0];
		setTimeout(function(){google.maps.event.trigger(map, 'resize');},400)
	 });
});	


/**
* Messages Slideout
*/ 
function slideout() {
	setTimeout(function() {
		jQuery(".form-msg").slideUp("slow", function() {});
	}, 5000);
}
function slideout_msgs() {
	setTimeout(function() {
		jQuery("#newsletter_mess").slideUp("slow", function() {});
	}, 5000);
}

 /**
 * Media upload
 */
jQuery(document).ready(function() {
	var ww = jQuery('#post_id_reference').text();
	window.original_send_to_editor = window.send_to_editor;
	window.send_to_editor_clone = function(html){
		imgurl = jQuery('a','<p>'+html+'</p>').attr('href');
		jQuery('#'+formfield).val(imgurl);
		tb_remove();
	}
	jQuery('input.uploadfile').click(function() {
		window.send_to_editor=window.send_to_editor_clone;
		formfield = jQuery(this).attr('name');
		tb_show('', 'media-upload.php?post_id=' + ww + '&type=image&TB_iframe=true');
		return false;
	});
});

 /**
 * User Login Authentication
 */			 
function cs_user_authentication(admin_url,id){
	"use strict";
	jQuery('.login-form-id-'+id+' .status-message').addClass('cs-spinner');
	jQuery('.login-form-id-'+id+' span.status').html('<i class="fa fa-spinner fa-spin"></i>').fadeIn();
	
	function newValues(id) {
		var serializedValues = jQuery("#ControlForm_"+id).serialize();
		return serializedValues;
	}
	var serializedReturn = newValues(id);
	jQuery('.login-form-id-'+id+' .status-message').removeClass('success error');
	jQuery.ajax({
		type:"POST",
		url: admin_url,
		dataType: 'json',
		data:serializedReturn, 
		success: function(data){
			jQuery('.login-form-id-'+id+' .status-message').html(data.message);
			jQuery('.fa-spin').remove();
			
			if (data.loggedin == false){
				jQuery('.login-form-id-'+id+' .status-message').removeClass('success').addClass( "error" );
				jQuery('.login-form-id-'+id+' .status-message').removeClass('cs-spinner');
				jQuery('.login-form-id-'+id+' .status-message').html(data.message);
				jQuery('.login-form-id-'+id+' .status-message').show();
			}else if (data.loggedin == true){
				jQuery('.login-form-id-'+id+' .status-message').removeClass('error').addClass( "success" );
				jQuery('.login-form-id-'+id+' .status-message').removeClass('cs-spinner');
				jQuery('.login-form-id-'+id+' .status-message').html(data.message);
				jQuery('.login-form-id-'+id+' .status-message').show();
				document.location.href = data.redirecturl;
			}
		}
	});
}

 /**
 * skills Function
 */	
function cs_progress_bar(){
	"use strict";	 
	jQuery('.skillbar').each(function() {
		jQuery(this).waypoint(function(direction) {
			jQuery(this).find('.skillbar-bar').animate({
				width: jQuery(this).attr('data-percent')
			}, 2000);
		}, {
			offset: "100%",
		triggerOnce: true
		});
	});
}
	
 /**
 * Add to Wishlist Function
 */	
function cs_addto_wishlist(admin_url, post_id){
	"use strict";
	 var dataString = 'post_id=' + post_id+'&action=cs_addto_usermeta';
	 jQuery(".post-"+post_id+" .cs-add-wishlist").html('<i class="fa fa-spinner fa-spin"></i>');
		jQuery.ajax({
			type:"POST",
			url: admin_url,
			data: dataString,
			success:function(response){
				jQuery(".post-"+post_id+" .cs-add-wishlist").html(response);
				jQuery(".post-"+post_id+" a.cs-add-wishlist").removeAttr("onclick");
			}
	});

	return false;
}

 /**
 * Remove Wishlist Function
 */		 
function cs_delete_wishlist(admin_url, post_id){
	if(confirm('Remove From wishlist')){
			"use strict";
			 var dataString = 'post_id=' + post_id+'&action=cs_delete_wishlist';
			 jQuery(".close-"+post_id).html('<i style="color:#fe9909;" class="fa fa-spinner fa-spin"></i>');
				jQuery.ajax({
					type:"POST",
					url: admin_url,
					data: dataString,
					success:function(response){
						jQuery(".close-"+post_id).parents('.holder-'+post_id).remove();
						
					}
			});
	}

	return false;
}

/**
* Remove Thumbnail Function
*/		 
function cs_delete_compaign_thumbnail(admin_url, post_id, thumb_id){
	if(confirm('Remove Featured Image')){
			"use strict";
			 var dataString = 'post_id=' + post_id+'&thumb_id='+thumb_id+'&action=cs_delete_compaign_thumbnail';
			 jQuery(".close-"+post_id).html('<i style="color:#fe9909;" class="fa fa-spinner fa-spin"></i>');
				jQuery.ajax({
					type:"POST",
					url: admin_url,
					data: dataString,
					success:function(response){
						jQuery(".attachment-thumbnail").remove();
						jQuery(".close-"+post_id).remove();
					}
			});
	}

	return false;
}

/**
* Delete User Campaign Function
*/		 
function cs_delete_user_compaign(admin_url, post_id, thumb_id){
	if(confirm('Delete Campaign')){
			"use strict";
			 var dataString = 'post_id=' + post_id+'&thumb_id='+thumb_id+'&action=cs_delete_user_compaign';
			 jQuery(".close-"+post_id).html('<i style="color:#fe9909;" class="fa fa-spinner fa-spin"></i>');
				jQuery.ajax({
					type:"POST",
					url: admin_url,
					data: dataString,
					success:function(response){
						jQuery(".campaing-post-"+post_id).remove();
					}
			});
	}

	return false;
}

/**
* User Register Validation
*/			 
function cs_registration_validation(admin_url,id){
	"use strict";
	jQuery('div#result_'+id).html('<i class="fa fa-spinner fa-spin"></i>').fadeIn();
	
	function newValues(id) {
		jQuery('#user_profile').val();
		var serializedValues = jQuery("#wp_signup_form_"+id).serialize();
		return serializedValues;
	}
	var serializedReturn = newValues(id);
	jQuery('div#result_'+id).removeClass('success error');
	jQuery.ajax({
		type:"POST",
		url: admin_url,
		dataType: 'json',
		data:serializedReturn, 
			
		success:function(response){
			if ( response.type == 'error' ) {
				jQuery('div#result_'+id+' .fa-spin').remove();
				jQuery("div#result_"+id).removeClass('success').addClass( "error" );
				jQuery("div#result_"+id).show();
				jQuery('div#result_'+id).html(response.message);
			} else if ( response.type == 'success' ) {
				jQuery('div#result_'+id+' .fa-spin').remove();
				jQuery("div#result_"+id).removeClass('error').addClass( "success" );
				jQuery("div#result_"+id).show();
				jQuery('div#result_'+id).html(response.message);
				
			}
		}
	});
}