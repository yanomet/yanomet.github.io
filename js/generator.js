var Base64 = {
    _keyStr: "QWERTYUIOPASDFGHJKLZXCVBNM+/=qwertyuiopasdfghjklzxcvbnm1234567890",
    encode: function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(
          enc2) + ("-") + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      return output;
    },
    decode: function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    },
    _utf8_encode: function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    },
    _utf8_decode: function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) |
            (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  }
         
    var encode = document.getElementById('encode'),
        decode = document.getElementById('decode'),
        output = document.getElementById('output'),
        input = document.getElementById('input'),
        input2 = document.getElementById('input2');
    
    
    // generator
    $('#encode').on('click', function (event) {
        event.preventDefault();
        var url = new URL($('#probleminput').val());
        var domain = url.hostname;
        var link = url.origin;
        $('.url').text(link+ '/');
        console.log("<==== URL IS RECORDED ===>");
        console.log("CLIENT URL : "+url.hostname);
    ///
    const stringToInt = str => 
      Array.prototype.slice.call(str).reduce((result, char, index) => result += char.charCodeAt(0) * (4**(str.length - index)), 0);
      var final = stringToInt(domain);
        console.log("USER ID : "+final);
        $('.uuid').text(final);
        $('#input').attr('value', final);
        $('.lisensi').text(Base64.encode(input.value));
        output.value = Base64.encode(input.value);
        console.log("LICENSE : "+Base64.encode(input.value));
        $('#results').show("slow");  
        $("#buat, #input2").hide();  
        $("#input, #IdCopy").show();
    });
    $('#buat').on('click', function () {
      output.value = Base64.encode(input2.value);
    });
    $("#input").click(function(){
      $(this).hide();
      $("#IdCopy").hide();
      $("#buat, #input2").show();
      $('#results').hide("slow");  
    });
    $("#probleminput").click(function(){
      $("#input, #IdCopy").show();
      $("#buat, #input2").hide();
    });
    // decode.onclick = function() {
    //     var $str = output.innerHTML;
    //     output.innerHTML = Base64.decode($str);
    // }    
   
    // copy code
  document.getElementById("IdCopy").addEventListener("click", function () {
    copyToClipboard(document.getElementById("input"));
  });
    // copy code
  document.getElementById("lccCopy").addEventListener("click", function () {
    copyToClipboard(document.getElementById("output"));
  });
  
  function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
  
    // copy the selection
    var succeed;
    try {
      succeed = document.execCommand("copy");
    } catch (e) {
      succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
    }
  
    if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
      // clear temporary content
      target.textContent = "";
    }
    return succeed;
  
  };
    $('#lccCopy').click(function () {
      var copyText = document.getElementById("output");
      copyText.select();
      document.execCommand("copy");
      $('.confirmation').html('Copied <b>LICENCE</b> to clipboard');
      $('.confirmation').show();
      setTimeout(function(){
        $('.confirmation').hide();
      },2000);
    });
    $('#IdCopy').click(function () {
      var copyText = document.getElementById("input");
      copyText.select();
      document.execCommand("copy");
      $('.confirmation').html('Copied <b>ID</b> to clipboard');
      $('.confirmation').show();
      setTimeout(function(){
        $('.confirmation').hide();
      },2000);
    });
  
    // massage output
    $('i[rel="pre"]').replaceWith(function () {
      return $("<pre><code>" + $(this).html() + "</code></pre>")
    });
  for (var pres = document.querySelectorAll("pre,kbd,blockquote"), i = 0; i <
    pres.length; i++) pres[i].addEventListener("click", function () {
    var e = getSelection(),
      t = document.createRange();
    t.selectNodeContents(this), e.removeAllRanges(), e.addRange(t);
  }, !1);
  
  