/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  ("use strict");

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" || isLocalhost)
  ) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case "installed":
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case "redundant":
                  throw new Error(
                    "The installing " + "service worker became redundant."
                  );

                default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function(e) {
        console.error("Error during service worker registration:", e);
      });
  }

  // Your custom JavaScript goes here

  //
  // TASK 1
  // Duplicate img by pressing button .duplicate-bacon
  //

  const baconBtn = document.querySelector(".duplicate-bacon");
  const baconContainer = document.querySelector(".container-bacon");
  const baconImg = document.querySelector(".img-bacon");

  function cloneBacon() {
    const copy = baconImg.cloneNode(true);
    baconContainer.appendChild(copy);
  }

  if (baconBtn) {
    baconBtn.addEventListener("click", cloneBacon);
  }

  // Fix: MDL interaction
  // Fields with error + required
  componentHandler.registerUpgradedCallback("MaterialTextfield", function(
    textfield
  ) {
    var input = $(textfield).find(".mdl-textfield__input");
    if (input.data("required") != null) input.attr("required", true);
  });

  // Input Mask
  $("[name='postal_code']").mask("00000");
  $("[name='phone']").mask("(000) 000-000-00");

  $("[name='credit_card']").mask("0000 - 0000 - 0000 - 0000");
  $("[name='security_code']").mask("000");
  $("[name='expiration_date']").mask("00/00");

  // Task 5 - Form Validation
  function validateForm() {
    let errorList = "";

    if (document.checkout_form.first_name.value == "") {
      errorList = errorList + "<li>First Name</li>";
    }
    if (document.checkout_form.last_name.value == "") {
      errorList = errorList + "<li>Last Name</li>";
    }
    if (document.checkout_form.email.value == "") {
      errorList = errorList + "<li>Email</li>";
    }
    if (document.checkout_form.postal_code.length < 5) {
      errorList = errorList + "<li>Postal Code</li>";
    }
    if (document.checkout_form.phone.length < 16) {
      errorList = errorList + "<li>Phone</li>";
    }
    if (document.checkout_form.credit_card.length < 25) {
      errorList = errorList + "<li>Credit Card</li>";
    }
    if (document.checkout_form.security_code.length < 3) {
      errorList = errorList + "<li>Security Code</li>";
    }
    if (document.checkout_form.expiration_date.length < 5) {
      errorList = errorList + "<li>Expiration Date</li>";
    }

    if (errorList != "") {
      document.querySelector(".mdl-dialog__title").innerHTML =
        "Some fields are't right yet...";
      document.querySelector(".mdl-dialog__subtitle").innerHTML =
        "Verify the following fields for errors.";
      document.querySelector(".mdl-dialog__body").innerHTML =
        "<ul>" + errorList + "</ul>";
      document.querySelector(".mdl-button.btn-close").innerHTML = "Close";
      dialog.showModal();
      return false;
    }

    document.querySelector(".mdl-dialog__title").innerHTML =
      "Thank you for your order!";
    document.querySelector(".mdl-dialog__subtitle").innerHTML =
      "Order number #" + fakeID(5);
    document.querySelector(".mdl-dialog__body").innerHTML =
      "You will receive an email notification shortly at this email address: <strong>" +
      document.checkout_form.email.value +
      "</strong>";
    document.querySelector(".mdl-button.btn-close").innerHTML =
      "Continue Shopping";
    dialog.showModal();
    return true;
  }

  $("[name='checkout_form']").on("submit", validateForm);

  // MDL Dialog Window
  const dialog = document.querySelector("#complete-purchase-dialog");
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  dialog
    .querySelector("button:not([disabled])")
    .addEventListener("click", function() {
      dialog.close();
    });

  // FIX FOR FIREFOX
  (function() {
    window.spawn =
      window.spawn ||
      function(gen) {
        function continuer(verb, arg) {
          var result;
          try {
            result = generator[verb](arg);
          } catch (err) {
            return Promise.reject(err);
          }
          if (result.done) {
            return result.value;
          } else {
            return Promise.resolve(result.value).then(onFulfilled, onRejected);
          }
        }
        var generator = gen();
        var onFulfilled = continuer.bind(continuer, "next");
        var onRejected = continuer.bind(continuer, "throw");
        return onFulfilled();
      };
    window.showModalDialog =
      window.showModalDialog ||
      function(url, arg, opt) {
        url = url || "";
        arg = arg || null;
        opt = opt || "dialogWidth:300px;dialogHeight:200px";
        var caller = showModalDialog.caller.toString();
        var dialog = document.body.appendChild(
          document.createElement("dialog")
        );
        dialog.setAttribute("style", opt.replace(/dialog/gi, ""));
        dialog.innerHTML =
          '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 4px; font-size: 20px; color: #000; text-decoration: none; outline: none;">&times;</a><iframe id="dialog-body" src="' +
          url +
          '" style="border: 0; width: 100%; height: 100%;"></iframe>';
        document.getElementById(
          "dialog-body"
        ).contentWindow.dialogArguments = arg;
        document
          .getElementById("dialog-close")
          .addEventListener("click", function(e) {
            e.preventDefault();
            //dialog.close();
            var event = document.createEvent("Event");
            event.initEvent("myEvent", true, true);
            dialog.dispatchEvent(event);
          });

        try {
          //dialog.showModal()
          dialog.style.top = "50px";
          dialog.style.display = "block";
          document.getElementsByTagName("body")[0].appendChild(dialog);
        } catch (err) {
          alert(err);
        }

        //if using yield
        if (caller.indexOf("yield") >= 0) {
          return new Promise(function(resolve, reject) {
            dialog.addEventListener("myEvent", function() {
              var returnValue = document.getElementById("dialog-body")
                .contentWindow.returnValue;
              document.body.removeChild(dialog);
              resolve(returnValue);
            });
          });
        }

        //if using eval
        var isNext = false;
        var nextStmts = caller.split("\n").filter(function(stmt) {
          if (isNext || stmt.indexOf("showModalDialog(") >= 0)
            return (isNext = true);
          return false;
        });
        dialog.addEventListener("close", function() {
          var returnValue = document.getElementById("dialog-body").contentWindow
            .returnValue;
          document.body.removeChild(dialog);
          nextStmts[0] = nextStmts[0].replace(
            /(window\.)?showModalDialog\(.*\)/g,
            JSON.stringify(returnValue)
          );
          eval("{\n" + nextStmts.join("\n"));
        });
        throw "Execution stopped until showModalDialog is closed";
      };
  })();

  // Make Fake ID
  function fakeID(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
})();
