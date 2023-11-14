import { FiPlus, FiSettings, FiX } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

import { useState } from "react";
import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

type BuilderOptions = {
	websiteName: string;
	colorTheme: "light" | "dark" | "both";
	primaryColor: string;
	navigationBar: {
		hasLogo: boolean;
		hasSearch: boolean;
		links: {
			name: string;
		}[];
	};
	pages: {
		name: string;
	}[];
};

const WebsiteBuilder = () => {
	const [buidlerOptions, setBuilderOptions] = useState<BuilderOptions>({
		colorTheme: "light",
		navigationBar: {
			hasLogo: true,
			hasSearch: true,
			links: [
				{
					name: "Home",
				},
			],
		},
		primaryColor: "#0e7a0d",
		websiteName: "My Website",
		pages: [],
	});

	return (
		<main className="relative flex flex-col lg:flex-row gap-2">
			{/* preview */}
			<div className="flex-1">
				{/* navbar */}
				<div className="bg-secondary rounded-lg flex justify-between items-center p-5">
					<div className="flex items-center gap-2">
						{buidlerOptions.navigationBar.hasLogo && (
							<div
								className="bg-primary rounded-full w-10 h-10 flex justify-center items-center"
								style={{ backgroundColor: buidlerOptions.primaryColor }}
							/>
						)}
						<p>
							{buidlerOptions.navigationBar.hasLogo
								? buidlerOptions.websiteName
								: "My Website"}
						</p>
					</div>
					<div className="group flex items-center gap-2">
						{/* links */}
						<div className="flex items-center relative">
							{buidlerOptions.navigationBar.links.map((link) => (
								<Button
									variant="link"
									onClick={() => {
										setBuilderOptions({
											// remvoe the link
											...buidlerOptions,
											navigationBar: {
												...buidlerOptions.navigationBar,
												links: buidlerOptions.navigationBar.links.filter(
													(l) => l.name !== link.name,
												),
											},
										});
									}}
								>
									{link.name}
								</Button>
							))}
							<Popover>
								<PopoverTrigger asChild>
									<Button
										size="icon"
										variant="outline"
										className="lg:absolute group-hover:relative top-0 right-0 lg:opacity-0 lg:group-hover:opacity-100"
									>
										<FiPlus />
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<form
										onSubmit={(e) => {
											e.preventDefault();
											const form = new FormData(e.target as HTMLFormElement);
											setBuilderOptions({
												...buidlerOptions,
												navigationBar: {
													...buidlerOptions.navigationBar,
													links: [
														...buidlerOptions.navigationBar.links,
														{
															name: form.get("link_name") as string,
														},
													],
												},
											});

											// reset form
											(e.target as HTMLFormElement).reset();
										}}
										className="flex gap-2 p-2"
									>
										<Input
											placeholder="Link name"
											name="link_name"
											className="flex-1"
										/>
										<Button type="submit">Add Link</Button>
									</form>
									<p className="text-sm opacity-50 mt-5">
										You can remove the link by clicking on the link on the
										navbar preview
									</p>
								</PopoverContent>
							</Popover>
						</div>
						{buidlerOptions.navigationBar.hasSearch && (
							<Input readOnly placeholder="Search for something" />
						)}
					</div>
				</div>

				{/* hero page */}
				<div className="min-h-[200px] flex justify-center items-center bg-secondary/20 rounded-lg mt-5">
					<p>Hero/Landing Page</p>
				</div>

				{/* pages */}
				{buidlerOptions.pages.map((page) => (
					<div className="min-h-[200px] flex justify-center items-center bg-secondary/20 rounded-lg mt-5 relative">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									className="absolute top-2 right-2"
									size="icon"
									variant="ghost"
								>
									<FiX />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className="flex flex-col items-end gap-3">
									<p>Do you want to remove this page?</p>
									<Button
										variant="destructive"
										onClick={() => {
											setBuilderOptions({
												...buidlerOptions,
												pages: buidlerOptions.pages.filter(
													(p) => p.name !== page.name,
												),
											});
										}}
									>
										Confirm remove page
									</Button>
								</div>
							</PopoverContent>
						</Popover>
						<p>{page.name}</p>
					</div>
				))}

				{/* add page button */}
				<Popover>
					<PopoverTrigger asChild>
						<Button className="w-full min-h-[40px] justify-center items-center gap-2 mt-5">
							<FiPlus />
							<span>Add Section</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full">
						<form
							className="flex items-center gap-2 w-full"
							onSubmit={(e) => {
								e.preventDefault();

								const form = new FormData(e.target as HTMLFormElement);
								setBuilderOptions({
									...buidlerOptions,
									pages: [
										...buidlerOptions.pages,
										{
											name:
												(form.get("page_name") as string) || "Untitled Section",
										},
									],
								});

								// reset form
								(e.target as HTMLFormElement).reset();
							}}
						>
							<Input
								placeholder="Section Name"
								name="page_name"
								className="flex-1"
							/>
							<Button type="submit">Add Section</Button>
						</form>
					</PopoverContent>
				</Popover>

				{/* footer */}
				<div className="flex flex-col gap-10 lg:gap-5 lg:flex-row lg:justify-between bg-secondary rounded-lg mt-5 p-5">
					<div className="flex flex-col gap-2">
						{buidlerOptions.navigationBar.hasLogo && (
							<div
								className="bg-primary rounded-full w-10 h-10 flex justify-center items-center"
								style={{ backgroundColor: buidlerOptions.primaryColor }}
							/>
						)}
						<p>
							{buidlerOptions.navigationBar.hasLogo
								? buidlerOptions.websiteName
								: "My Website"}
						</p>
						<p>
							© {new Date().getFullYear()} {buidlerOptions.websiteName}
						</p>
					</div>
					<div className="flex flex-col gap-2 lg:flex-row">
						<h5 className="lg:hidden">Links</h5>
						<div className="flex gap-2 flex-wrap">
							{buidlerOptions.navigationBar.links.map((link) => (
								<Button variant="link">{link.name}</Button>
							))}
						</div>
					</div>
				</div>
				<p className="text-sm max-w-lg text-right ml-auto opacity-20">
					Footer links are the same as the navbar links. You can add links by
					clicking on the navbar links. If you want a custom footer, you can
					contact me.
				</p>
			</div>
			{/* controls - hide on desktop */}
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button
						className="sticky lg:hidden bottom-[20px] ml-auto mr-2"
						size="icon"
					>
						<FiSettings />
					</Button>
				</Drawer.Trigger>
				<Drawer.Portal>
					<Drawer.Overlay className="fixed w-full h-screen top-0 left-0 bg-black/90 z-[50]" />
					<Drawer.Content className="fixed bottom-0 left-0 z-[51] w-full">
						<div className="rounded-t-lg bg-background px-5 pb-16 pt-5 w-full max-w-5xl mx-auto flex flex-col gap-5">
							<div className="w-12 h-1 rounded-full bg-foreground mx-auto" />

							<div className="flex flex-col gap-2">
								<h5>Basic Settings</h5>
								<div className="flex flex-col gap-2 pl-3">
									<div>
										<label className="text-sm ml-3 opacity-50">
											Website Name
										</label>
										<Input
											value={buidlerOptions.websiteName}
											type="text"
											onChange={(e) =>
												setBuilderOptions({
													...buidlerOptions,
													websiteName: e.target.value,
												})
											}
										/>
									</div>
									<div>
										<label className="text-sm ml-3 opacity-50">
											Color Theme
										</label>
										<Select
											value={buidlerOptions.colorTheme}
											onValueChange={(e) => {
												setBuilderOptions({
													...buidlerOptions,
													colorTheme: e as BuilderOptions["colorTheme"],
												});
											}}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select Color Theme" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="light">Light</SelectItem>
												<SelectItem value="dark">Dark</SelectItem>
												<SelectItem value="both">Both</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<label className="text-sm ml-3 opacity-50">
											Primary Color
										</label>
										<Input
											value={buidlerOptions.primaryColor}
											type="color"
											onChange={(e) =>
												setBuilderOptions({
													...buidlerOptions,
													primaryColor: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<h5>Navigation Bar Settings</h5>
								<div className="flex flex-col gap-2 pl-3">
									<label className="flex justify-between items-center">
										<span>Logo</span>
										<Switch
											checked={buidlerOptions.navigationBar.hasLogo}
											onCheckedChange={(e) =>
												setBuilderOptions({
													...buidlerOptions,
													navigationBar: {
														...buidlerOptions.navigationBar,
														hasLogo: e,
													},
												})
											}
										/>
									</label>
									<label className="flex justify-between items-center">
										<span>Search Bar</span>
										<Switch
											checked={buidlerOptions.navigationBar.hasSearch}
											onCheckedChange={(e) =>
												setBuilderOptions({
													...buidlerOptions,
													navigationBar: {
														...buidlerOptions.navigationBar,
														hasSearch: e,
													},
												})
											}
										/>
									</label>
								</div>
							</div>
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>

			{/* controls - hide on mobile */}
			<div className="hidden lg:flex flex-col min-w-[250px] sticky gap-10 top-[100px] max-h-12 z-10">
				<div className="flex flex-col gap-2">
					<h5>Basic Settings</h5>
					<div className="flex flex-col gap-2 pl-3">
						<div>
							<label className="text-sm ml-3 opacity-50">Website Name</label>
							<Input
								value={buidlerOptions.websiteName}
								type="text"
								onChange={(e) =>
									setBuilderOptions({
										...buidlerOptions,
										websiteName: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<label className="text-sm ml-3 opacity-50">Color Theme</label>
							<Select
								value={buidlerOptions.colorTheme}
								onValueChange={(e) => {
									setBuilderOptions({
										...buidlerOptions,
										colorTheme: e as BuilderOptions["colorTheme"],
									});
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Color Theme" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="both">Both</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<label className="text-sm ml-3 opacity-50">Primary Color</label>
							<Input
								value={buidlerOptions.primaryColor}
								type="color"
								onChange={(e) =>
									setBuilderOptions({
										...buidlerOptions,
										primaryColor: e.target.value,
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h5>Navigation Bar Settings</h5>
					<div className="flex flex-col gap-2 pl-3">
						<label className="flex justify-between items-center">
							<span>Logo</span>
							<Switch
								checked={buidlerOptions.navigationBar.hasLogo}
								onCheckedChange={(e) =>
									setBuilderOptions({
										...buidlerOptions,
										navigationBar: {
											...buidlerOptions.navigationBar,
											hasLogo: e,
										},
									})
								}
							/>
						</label>
						<label className="flex justify-between items-center">
							<span>Search Bar</span>
							<Switch
								checked={buidlerOptions.navigationBar.hasSearch}
								onCheckedChange={(e) =>
									setBuilderOptions({
										...buidlerOptions,
										navigationBar: {
											...buidlerOptions.navigationBar,
											hasSearch: e,
										},
									})
								}
							/>
						</label>
					</div>
				</div>
			</div>
		</main>
	);
};

export default WebsiteBuilder;
