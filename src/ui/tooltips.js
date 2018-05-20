import {DiscordModules} from "modules";

/** 
 * Tooltips that automatically show and hide themselves on mouseenter and mouseleave events.
 * Will also remove themselves if the node to watch is removed from DOM through
 * a MutationObserver.
 * 
 * @module PluginTooltip
 * @version 0.1.1
 */


// example usage `new PluginTooltip.Tooltip($('#test-element), "Hello World", {side: "top"});`

/** 
 * Custom tooltip, not using internals.
 * @class 
 * @version 0.1.0
 */
export class PluginTooltip {
	/**
	 * 
	 * @constructor
	 * @param {(HTMLElement|jQuery)} node - DOM node to monitor and show the tooltip on
	 * @param {string} tip - string to show in the tooltip
	 * @param {object} options - additional options for the tooltip
	 * @param {string} [options.style=black] - correlates to the discord styling
	 * @param {string} [options.side=top] - can be any of top, right, bottom, left
	 * @param {boolean} [options.preventFlip=false] - prevents moving the tooltip to the opposite side if it is too big or goes offscreen
	 */
	constructor(node, tip, options = {}) {
		if (!(node instanceof jQuery) && !(node instanceof Element)) return undefined;
		this.node = node instanceof jQuery ? node : $(node);
		const {style = "black", side = "top", preventFlip = false} = options;
		this.tip = tip;
		this.side = side;
		this.preventFlip = preventFlip;
		this.tooltip = $(`<div class="tooltip tooltip-${style}">`);
		this.tooltip.text(tip);

		node.on("mouseenter.tooltip", () => {
            this.show();
			
			var observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					var nodes = Array.from(mutation.removedNodes);
					var directMatch = nodes.indexOf(node[0]) > -1;
					var parentMatch = nodes.some(parent => parent.contains(node[0]));
					if (directMatch || parentMatch) {
						this.tooltip.detach();
						observer.disconnect();
					}
				});
			});

			observer.observe(document.body, {subtree: true, childList: true});
		});

		node.on("mouseleave.tooltip", () => {
			this.tooltip.detach();
		});
	}

    /** Boolean representing if the tooltip will fit on screen above the element */
    get canShowAbove() { return this.node.offset().top - this.tooltip.outerHeight() >= 0; }
    /** Boolean representing if the tooltip will fit on screen below the element */
    get canShowBelow() { return this.node.offset().top + this.node.outerHeight() + this.tooltip.outerHeight() <= window.ZeresLibrary.Screen.height; }
    /** Boolean representing if the tooltip will fit on screen to the left of the element */
    get canShowLeft() { return this.node.offset().left - this.tooltip.outerWidth() >= 0; }
    /** Boolean representing if the tooltip will fit on screen to the right of the element */
	get canShowRight() { return this.node.offset().left + this.node.outerWidth() + this.tooltip.outerWidth() <= window.ZeresLibrary.Screen.width; }

    /** Hides the tooltip. Automatically called on mouseleave. */
	hide() {
		this.tooltip.hide();
	}

    /** Shows the tooltip. Automatically called on mouseenter. Will attempt to flip if position was wrong. */
	show() {
		this.tooltip.show();
		this.tooltip.removeClass("tooltip-bottom");
		this.tooltip.removeClass("tooltip-top");
		this.tooltip.removeClass("tooltip-left");
		this.tooltip.removeClass("tooltip-right");
		this.tooltip.appendTo(".tooltips");

		if (this.side == "top") {
			if (this.canShowAbove || (!this.canShowAbove && this.preventFlip)) this.showAbove();
			else this.showBelow();
		}

		if (this.side == "bottom") {
			if (this.canShowBelow || (!this.canShowBelow && this.preventFlip)) this.showBelow();
			else this.showAbove();
		}

		if (this.side == "left") {
			if (this.canShowLeft || (!this.canShowLeft && this.preventFlip)) this.showLeft();
			else this.showRight();
		}

		if (this.side == "right") {
			if (this.canShowRight || (!this.canShowRight && this.preventFlip)) this.showRight();
			else this.showLeft();
		}
	}

    /** Force showing the tooltip above the node. */
	showAbove() {
		this.tooltip.addClass("tooltip-top");
		this.tooltip.css("top", this.node.offset().top - this.tooltip.outerHeight());
		this.centerHorizontally();
	}

    /** Force showing the tooltip below the node. */
	showBelow() {
		this.tooltip.addClass("tooltip-bottom");
		this.tooltip.css("top", this.node.offset().top + this.node.outerHeight());
		this.centerHorizontally();
	}

    /** Force showing the tooltip to the left of the node. */
	showLeft() {
		this.tooltip.addClass("tooltip-left");
		this.tooltip.css("left", this.node.offset().left - this.tooltip.outerWidth());
		this.centerVertically();
	}

    /** Force showing the tooltip to the right of the node. */
	showRight() {
		this.tooltip.addClass("tooltip-right");
		this.tooltip.css("left", this.node.offset().left + this.node.outerWidth());
		this.centerVertically();
	}

	centerHorizontally() {
		var nodecenter = this.node.offset().left + (this.node.outerWidth() / 2);
		this.tooltip.css("left", nodecenter - (this.tooltip.outerWidth() / 2));
	}

	centerVertically() {
		var nodecenter = this.node.offset().top + (this.node.outerHeight() / 2);
		this.tooltip.css("top", nodecenter - (this.tooltip.outerHeight() / 2));
	}
}


/** 
 * Tooltips done using Discord's internals.
 * @version 0.0.1
 */
export class NativeTooltip {
	/**
	 * 
	 * @constructor
	 * @param {(HTMLElement|jQuery)} node - DOM node to monitor and show the tooltip on
	 * @param {string} tip - string to show in the tooltip
	 * @param {object} options - additional options for the tooltip
	 * @param {string} [options.style=black] - correlates to the discord styling
	 * @param {string} [options.side=top] - can be any of top, right, bottom, left
	 * @param {boolean} [options.preventFlip=false] - prevents moving the tooltip to the opposite side if it is too big or goes offscreen
	 */
	constructor(node, text, options = {}) {
		if (!(node instanceof jQuery) && !(node instanceof Element)) return undefined;
		this.node = node instanceof jQuery ? node[0] : node;
		const {style = "black", side = "top"} = options;
		this.label = text;
		this.style = style;
		this.side = side;
		this.id = DiscordModules.KeyGenerator();

		this.node.addEventListener("mouseenter", () => {
			this.show();

			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					const nodes = Array.from(mutation.removedNodes);
					const directMatch = nodes.indexOf(this.node) > -1;
					const parentMatch = nodes.some(parent => parent.contains(this.node));
					if (directMatch || parentMatch) {
						this.hide();
						observer.disconnect();
					}
				});
			});

			observer.observe(document.body, {subtree: true, childList: true});
		});

		this.node.addEventListener("mouseleave", () => {
			this.hide();
		});
	}

    /** Hides the tooltip. Automatically called on mouseleave. */
	hide() {
		DiscordModules.Tooltips.hide(this.id);
    }
    
    /** Shows the tooltip. Automatically called on mouseenter. */
	show() {
		const {left, top, width, height} = this.node.getBoundingClientRect();
		DiscordModules.Tooltips.show(this.id, {
			position: this.side,
			text: this.label,
			color: this.style,
			targetWidth: width,
			targetHeight: height,
			x: left,
			y: top
		});
	}
}