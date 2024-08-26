<script lang="ts">
	// Keine zusätzlichen Logiken erforderlich
</script>

<div class="container">
	<h1>Willkommen zum BARF-Rechner</h1>
	<p>Bitte wählen Sie eine der folgenden Optionen:</p>

	<div class="links">
		<a href="/dogs" class="link-card">Hunde verwalten</a>
		<a href="/meat" class="link-card">Fleischsorten verwalten</a>
		<a href="/rechner" class="link-card">BARF-Rechner</a>
	</div>
</div>

<style>
	.container {
		text-align: center;
		margin-top: 5rem;
	}

	.links {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 2rem;
	}

	.link-card {
		display: block;
		padding: 1.5rem 2rem;
		background-color: #f5f5f5;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease, background-color 0.2s ease;
	}

	.link-card:hover {
		transform: translateY(-5px);
		background-color: #e0e0e0;
	}

	.link-card:active {
		transform: translateY(0);
	}
</style>
