import { App, PluginSettingTab, Setting } from 'obsidian';
import MyPlugin from './main';

export interface PrayerSidebarSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: PrayerSidebarSettings = {
	mySetting: 'default',
};

export class PrayerSidebarSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getSettingDefinitions() {
		return [
			{
				name: 'File Path',
				desc: 'Put the path from the vault folder of the file that contains your prayer requests.',
				control: {
					type: 'text',
					key: 'cacheKey',
					placeholder: 'Prayer Requests',
					// validate: (value: string) =>
					// 	/^[a-z0-9]*$/i.test(value.trim()) ? undefined : 'Use letters and digits only.',
				},
			},
		];
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder('Enter your secret')
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
